import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
  // },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`; // 토큰이 JSON 문자열이면 파싱
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);