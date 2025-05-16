import axios, { type InternalAxiosRequestConfig } from "axios"
import { LOCAL_STORAGE_KEY } from "../constants/key"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?:boolean; // 요청 재시도 여부 나타내는 플래그
}

let refreshPromise : Promise<string> | null = null;


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
})




axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const accessToken = getItem() // 로컬스토리지에서 어세스토큰을 가져옴
    

    if(accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    // 수정된 요청 설정을 반환함
    return config
},
// 인터셉터 실패하면 에러
    (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 에러 발생 -> refresh token을 통한 토큰 갱신 처리
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        
      const originalRequest: CustomInternalAxiosRequestConfig = error.config;
  
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        if (originalRequest.url === '/v1/auth/refresh') {
          const { removeItem: removeAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { removeItem: removeRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          removeAccessToken();
          removeRefreshToken();
          window.location.href = '/login';
          return Promise.reject(error);
        }
  
        originalRequest._retry = true;
  
        // 이미 리프레시 요청이 진행중이면 그 promise를 재사용
        if (!refreshPromise) {
          console.log('Initializing refreshPromise...');
          refreshPromise = (async () => {
            console.log('Fetching refresh token...');
            const { getItem: getRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            const refreshToken = getRefreshToken();
        
            if (!refreshToken) {
              console.error('Refresh token is missing');
              throw new Error('Refresh token is missing');
            }
        
            console.log('Sending refresh token request...');
            const { data } = await axiosInstance.post('/v1/auth/refresh', {
              refresh: refreshToken,
            });
        
            console.log('Refresh token response:', data);
        
            const { setItem: setAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { setItem: setRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
        
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
        
            console.log('New tokens stored successfully');
            return data.data.accessToken;
          })()
          .catch((error) => {
            console.error('Error during token refresh:', error);
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            window.location.href = '/login';
            return Promise.reject(error);
          })
          .finally(() => {
            console.log('Resetting refreshPromise to null');
            refreshPromise = null;
          });
        }
        
        return refreshPromise.then((newAccessToken) => {
          console.log('Retrying original request with new access token:', newAccessToken);
        
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
          return axiosInstance.request(originalRequest);
        });
      }

      return Promise.reject();
    }
  );
