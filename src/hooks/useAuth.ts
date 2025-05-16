import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        // 로그인 후 메인 페이지로 이동
        navigate('/week5/');
    };

    const logout = () => {
        setIsAuthenticated(false);
        // 로그아웃 후 로그인 페이지로 이동
        navigate('/week5/login');
    };

    return { isAuthenticated, login, logout };
};
