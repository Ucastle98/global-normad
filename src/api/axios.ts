import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.com',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 예: 로컬스토리지 토큰 삽입
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 토큰 만료 처리, 공통 에러 로깅 등
    if (error.response?.status === 401) {
      // 재인증 로직 삽입 가능
    }
    return Promise.reject(error);
  },
);

export default api;