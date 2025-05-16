import axiosInstance from '../utils/axiosInstance';

export const login = async (username: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    return response.data;
};

export const logout = async () => {
    await axiosInstance.post('/auth/logout');
};

export const refreshToken = async () => {
    const response = await axiosInstance.post('/auth/refresh');
    return response.data;
};
