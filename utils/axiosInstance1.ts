import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = async (): Promise<void> => {
  await refreshApi.post("/api/auth/refresh-token");
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    const isRefreshRequest = originalRequest.url?.includes(
      "/api/auth/refresh-token",
    );

    if (status !== 401 || originalRequest._retry || isRefreshRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      await refreshPromise;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default api;
