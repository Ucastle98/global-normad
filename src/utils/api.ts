import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sp-globalnomad-api.vercel.app/17-2";

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 필요 시 쿠키 전송
});

// 응답 인터셉터: data만 반환
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config),
  post: <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, body, config),
  patch: <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, body, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
};

export default api;