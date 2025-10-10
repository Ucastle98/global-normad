import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

/**
 * API 기본 URL 설정
 * NEXT_PUBLIC_API_URL은 .env.local에 정의되어 있음
 * 예시:
 * NEXT_PUBLIC_API_URL=https://sp-globalnomad-api.vercel.app/17-2/
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sp-globalnomad-api.vercel.app/17-2/";

console.log("✅ API Base URL:", API_BASE_URL); // ✅ 순서 이동 완료
  
/**
 * Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // 쿠키 인증 미포함
});

/**
 * 요청 인터셉터 (Request Interceptor)
 * - 요청이 전송되기 전에 실행됨
 * - Authorization 헤더에 토큰이 있으면 자동으로 추가
 */
apiClient.interceptors.request.use(
  (config) => {
    // 예시: 토큰은 localStorage 또는 sessionStorage에 저장돼 있다고 가정
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Bearer 토큰 헤더 자동 추가
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 전 단계에서 에러가 발생한 경우
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터 (Response Interceptor)
 * - 모든 Axios 응답에서 response.data만 반환
 * - 401(인증 만료) 등 에러는 글로벌하게 처리 가능
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data, // data만 반환
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ 인증이 만료되었습니다. 다시 로그인해주세요.");
      // 예시: 자동 로그아웃 또는 로그인 페이지로 이동
      // window.location.href = "/login";
    }

    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

/**
 * CRUD wrapper (타입 안전 버전)
 * - AxiosResponse<T> 대신 T 자체를 반환
 * - 제너릭 <T> 덕분에 any 사용 없이 타입 추론 가능
 */
const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get(url, config),
  post: async <T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => apiClient.post(url, body, config),
  patch: async <T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => apiClient.patch(url, body, config),
  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => apiClient.delete(url, config),
};

export default api;
