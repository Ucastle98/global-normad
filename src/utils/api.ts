// src/utils/api.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

/**
 * ✅ API 기본 URL 설정
 * NEXT_PUBLIC_API_URL은 .env.local에 정의되어 있음
 * 예시:
 * NEXT_PUBLIC_API_URL=https://sp-globalnomad-api.vercel.app/17-2/
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sp-globalnomad-api.vercel.app/17-2/";

console.log("✅ API Base URL:", API_BASE_URL);

/**
 * ✅ Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // 쿠키 인증 미포함
});

/**
 * ✅ 요청 인터셉터 (Request Interceptor)
 * - 요청이 전송되기 전에 실행됨
 * - Authorization 헤더에 토큰이 있으면 자동으로 추가
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ✅ 응답 인터셉터 (Response Interceptor)
 * - 모든 Axios 응답에서 response.data만 반환
 * - 401(인증 만료) 등 에러는 글로벌하게 처리 가능
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ 인증이 만료되었습니다. 다시 로그인해주세요.");
      // 예: 자동 로그아웃 처리
      // window.location.href = "/login";
    }

    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

/**
 * ✅ 타입 안전한 CRUD wrapper
 * - <T> : 응답 데이터 타입
 * - <B> : 요청 body 타입 (POST, PATCH에서 사용)
 * - AxiosResponse<T> 대신 T 자체를 반환
 */
const api = {
  /** GET 요청 */
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => apiClient.get(url, config),

  /** POST 요청 */
  post: async <T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig
  ): Promise<T> => apiClient.post(url, body, config),

  /** PATCH 요청 */
  patch: async <T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig
  ): Promise<T> => apiClient.patch(url, body, config),

  /** DELETE 요청 */
  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => apiClient.delete(url, config),
};

export default api;
