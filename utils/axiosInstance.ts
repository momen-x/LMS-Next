import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_DOMAIN } from "./constance";

const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

let csrfToken: string | null = null;
let csrfRequest: Promise<string> | null = null;

const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

type CsrfResponse = {
  csrfToken: string;
};

type ApiErrorResponse = {
  code?: string;
  message?: string;
};

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

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toLowerCase() ?? "get";

    if (unsafeMethods.has(method)) {
      const token = await requestCsrfToken();

      config.headers.set("X-CSRF-Token", token);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _csrfRetry?: boolean;
        })
      | undefined;

    const isInvalidCsrf =
      error.response?.status === 403 &&
      error.response.data?.code === "INVALID_CSRF_TOKEN";

    if (isInvalidCsrf && originalRequest && !originalRequest._csrfRetry) {
      originalRequest._csrfRetry = true;

      clearCsrfToken();

      const newToken = await requestCsrfToken();

      originalRequest.headers.set("X-CSRF-Token", newToken);

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
