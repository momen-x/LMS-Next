import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { API_DOMAIN } from "./constance";

export const api = axios.create({
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
  message?: string | string[];
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

function getErrorMessage(error: AxiosError<ApiErrorResponse>): string {
  const message = error.response?.data?.message;

  if (Array.isArray(message)) {
    return message.join(" ");
  }

  return message ?? "";
}

function isInvalidCsrfError(
  error: unknown,
): error is AxiosError<ApiErrorResponse> {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return false;
  }

  if (error.response?.status !== 403) {
    return false;
  }

  const code = error.response.data?.code;
  const message = getErrorMessage(error).toLowerCase();

  return (
    code === "INVALID_CSRF_TOKEN" ||
    message.includes("invalid csrf token") ||
    message.includes("csrf token is invalid")
  );
}

function isAuthenticationMutation(url?: string): boolean {
  if (!url) {
    return false;
  }

  return (
    url.includes("/api/auth/login") ||
    url.includes("/api/auth/register") ||
    url.includes("/api/auth/logout") ||
    url.includes("/api/auth/refresh")
  );
}

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
  if (csrfToken) {
    return csrfToken;
  }

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

  /*
   * Refresh may rotate cookies.
   * Do not reuse the CSRF token that existed before refresh.
   */
  clearCsrfToken();
}

async function refreshAccessToken(): Promise<void> {
  if (refreshRequest) {
    return refreshRequest;
  }

  refreshRequest = (async () => {
    try {
      const token = await requestCsrfToken();

      await executeRefreshRequest(token);
    } catch (error: unknown) {
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
  (response) => {
    /*
     * Login, register, logout and refresh may change the cookies
     * associated with the current session.
     *
     * Remove the old in-memory token so the next POST/PATCH/DELETE
     * receives a CSRF token matching the new session.
     */
    if (isAuthenticationMutation(response.config.url)) {
      clearCsrfToken();
    }

    return response;
  },

  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /* ---------------------------------------------------------------------- */
    /*                         Invalid CSRF Token                              */
    /* ---------------------------------------------------------------------- */

    if (isInvalidCsrfError(error) && !originalRequest._csrfRetry) {
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

    const canAttemptRefresh =
      error.response?.status === 401 &&
      !originalRequest._authRetry &&
      !shouldSkipRefresh(originalRequest.url);

    if (canAttemptRefresh) {
      originalRequest._authRetry = true;

      try {
        await refreshAccessToken();

        const method = originalRequest.method?.toLowerCase() ?? "get";

        if (unsafeMethods.has(method)) {
          const freshToken = await requestCsrfToken();

          originalRequest.headers.set("X-CSRF-Token", freshToken);
        }

        return api(originalRequest);
      } catch (refreshError: unknown) {
        clearCsrfToken();
        notifySessionExpired();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
