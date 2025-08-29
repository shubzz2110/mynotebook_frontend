import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // skip auth routes
    if (
      originalRequest.url?.includes("/accounts/login/") ||
      originalRequest.url?.includes("/accounts/register/")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/accounts/token/refresh/");
        processQueue(null, null);
        return api(originalRequest);
      } catch (refreshError) {
        // ❌ Refresh failed → session expired
        processQueue(refreshError, null);

        if (typeof window !== "undefined") {
          const params = new URLSearchParams({ reason: "expired" });
          window.location.href = `/auth/login?${params.toString()}`;
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
