import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { API_DOMAIN } from "./constance";

const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type CsrfResponse = {
  csrfToken: string;
};

type ApiErrorResponse = {
  code?: string;
  message?: string;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _csrfRetry?: boolean;
  _authRetry?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                Shared State                                */
/* -------------------------------------------------------------------------- */

let csrfToken: string | null = null;
let csrfRequest: Promise<string> | null = null;

let refreshRequest: Promise<void> | null = null;

const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

/**
 * These routes may legitimately return 401.
 * A failed login, for example, must not trigger token refresh.
 *
 * Update the route names if your backend uses different paths.
 */
const refreshExcludedRoutes = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
];

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */

function shouldSkipRefresh(url?: string): boolean {
  if (!url) {
    return false;
  }

  return refreshExcludedRoutes.some((route) => url.includes(route));
}

function isInvalidCsrfError(
  error: unknown,
): error is AxiosError<ApiErrorResponse> {
  return (
    axios.isAxiosError<ApiErrorResponse>(error) &&
    error.response?.status === 403 &&
    error.response.data?.code === "INVALID_CSRF_TOKEN"
  );
}

/**
 * Notify the React application that the authentication session has expired.
 *
 * Later, a client component can listen to this event and:
 * - clear authenticated queries
 * - redirect the user to /login
 */
function notifySessionExpired(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("auth:session-expired"));
}

/* -------------------------------------------------------------------------- */
/*                                CSRF Handling                               */
/* -------------------------------------------------------------------------- */

async function requestCsrfToken(): Promise<string> {
  /*
   * Reuse the token already stored in memory.
   */
  if (csrfToken) {
    return csrfToken;
  }

  /*
   * If another request is currently getting a CSRF token,
   * wait for the same request instead of sending another one.
   */
  if (csrfRequest) {
    return csrfRequest;
  }

  csrfRequest = axios
    .get<CsrfResponse>(`${API_DOMAIN}/api/auth/csrf-token`, {
      withCredentials: true,
    })
    .then((response) => {
      const token = response.data.csrfToken;

      if (!token) {
        throw new Error("CSRF token was not returned by the server");
      }

      csrfToken = token;

      return token;
    })
    .finally(() => {
      csrfRequest = null;
    });

  return csrfRequest;
}

export function clearCsrfToken(): void {
  csrfToken = null;
  csrfRequest = null;
}

/* -------------------------------------------------------------------------- */
/*                              Refresh Handling                              */
/* -------------------------------------------------------------------------- */

/**
 * Sends the real refresh request.
 *
 * We deliberately use the default Axios client instead of `api`.
 * This prevents the refresh request from entering the same response
 * interceptor and creating a refresh loop.
 */
async function executeRefreshRequest(token: string): Promise<void> {
  await axios.post(
    `${API_DOMAIN}/api/auth/refresh`,
    {},
    {
      withCredentials: true,
      headers: {
        "X-CSRF-Token": token,
      },
    },
  );
}

/**
 * Refreshes the access-token cookie.
 *
 * Only one refresh request is allowed at a time. If several protected
 * requests receive 401 together, all of them wait for the same Promise.
 */
async function refreshAccessToken(): Promise<void> {
  if (refreshRequest) {
    return refreshRequest;
  }

  refreshRequest = (async () => {
    try {
      const token = await requestCsrfToken();

      await executeRefreshRequest(token);
    } catch (error: unknown) {
      /*
       * The access token may expire while the CSRF token cached in memory
       * has also become invalid.
       *
       * In that case:
       * 1. Clear the old CSRF token.
       * 2. Get a fresh CSRF token.
       * 3. Retry refresh once.
       */
      if (!isInvalidCsrfError(error)) {
        throw error;
      }

      clearCsrfToken();

      const freshToken = await requestCsrfToken();

      await executeRefreshRequest(freshToken);
    }
  })().finally(() => {
    refreshRequest = null;
  });

  return refreshRequest;
}

/* -------------------------------------------------------------------------- */
/*                            Request Interceptor                             */
/* -------------------------------------------------------------------------- */

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const method = config.method?.toLowerCase() ?? "get";

    /*
     * The backend ignores CSRF validation for:
     * GET, HEAD and OPTIONS.
     *
     * Therefore, we add the header only to unsafe methods.
     */
    if (unsafeMethods.has(method)) {
      const token = await requestCsrfToken();

      config.headers.set("X-CSRF-Token", token);
    }

    return config;
  },

  (error: unknown) => Promise.reject(error),
);

/* -------------------------------------------------------------------------- */
/*                            Response Interceptor                            */
/* -------------------------------------------------------------------------- */

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /* ---------------------------------------------------------------------- */
    /*                         Invalid CSRF Token                              */
    /* ---------------------------------------------------------------------- */

    const isInvalidCsrf =
      error.response?.status === 403 &&
      error.response.data?.code === "INVALID_CSRF_TOKEN";

    if (isInvalidCsrf && !originalRequest._csrfRetry) {
      originalRequest._csrfRetry = true;

      try {
        clearCsrfToken();

        const freshToken = await requestCsrfToken();

        originalRequest.headers.set("X-CSRF-Token", freshToken);

        return api(originalRequest);
      } catch (csrfError: unknown) {
        return Promise.reject(csrfError);
      }
    }

    /* ---------------------------------------------------------------------- */
    /*                         Expired Access Token                            */
    /* ---------------------------------------------------------------------- */

    const isUnauthorized = error.response?.status === 401;

    const canAttemptRefresh =
      isUnauthorized &&
      !originalRequest._authRetry &&
      !shouldSkipRefresh(originalRequest.url);

    if (canAttemptRefresh) {
      originalRequest._authRetry = true;

      try {
        /*
         * POST /api/auth/refresh:
         *
         * - sends refresh_token automatically through cookies
         * - sends X-CSRF-Token manually
         * - receives a new access_token cookie
         */
        await refreshAccessToken();

        /*
         * Retry the original failed request.
         *
         * The browser automatically attaches the new access-token cookie.
         */
        return api(originalRequest);
      } catch (refreshError: unknown) {
        /*
         * The refresh token may be:
         * - expired
         * - missing
         * - revoked
         * - invalid
         *
         * The React application should now clear authenticated state
         * and redirect the user to the login page.
         */
        notifySessionExpired();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
