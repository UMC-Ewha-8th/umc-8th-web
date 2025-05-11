import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 나타내는 플래그그
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let refreshPromise: Promise<string> | null = null; // 리프레시 토큰 요청을 위한 Promise를 저장하는 변수(중복 요청 방지)

//요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // 로컬 스토리지에서 accessToken을 가져옴

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`; // Authorization 헤더에 accessToken을 추가
    }

    //수정된 요청 설정을 반환환
    return config;
  },
  (error) => Promise.reject(error)
); // 요청 오류가 발생하면 Promise.reject를 사용하여 오류를 반환

//응답 인터셉터: 401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 성공적이면 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config; // 오류가 발생한 요청을 가져옴

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //refresh 엔드포인트 401 에러가 발생한 경우, 중복 재시도 방지를 위해 로그아웃
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken(); // accessToken 삭제
        removeRefreshToken(); // refreshToken 삭제
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
        return Promise.reject(error); // 오류를 반환하여 체인을 종료
      }

      //재시도 플래그 설정
      originalRequest._retry = true; // 요청 재시도 플래그를 true로 설정

      //이미 리프레시 토큰 요청이 진행 중인 경우, 해당 Promise를 반환하여 중복 요청 방지
      if (refreshPromise) {
        refreshPromise = async()=>{
            const{getItem: getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            const refreshToken = getRefreshToken(); // 로컬 스토리지에서 refreshToken을 가져옴
           const {data} = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          setAccessToken(data.data.accessToken); // 새로운 accessToken을 로컬 스토리지에 저장
          setRefreshToken(data.data.refreshToken); // 새로운 refreshToken을 로컬 스토리지에 저장

         return data.data.accessToken; // 새로운 accessToken을 반환
        }}()
        .catch((error) => {
            const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessToken(); // accessToken 삭제
            removeRefreshToken(); // refreshToken 삭제
    }).finally(()=>{
        refreshPromise = null;
    });
  }

  //진행중인 refreshPromise가 해결될 때까지 기다림
  return refreshPromise.then((newAccessToken) => {
    //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업뎃
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 새로운 accessToken을 Authorization 헤더에 추가
    return axiosInstance(originalRequest); // 원래 요청을 새로운 accessToken으로 재시도
  });
}
return Promise.reject(error); // 오류를 반환하여 체인을 종료

);
