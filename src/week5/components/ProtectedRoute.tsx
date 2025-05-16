import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
    if (!isAuthenticated) {
        // 로그인이 안 되어 있다면 로그인 페이지로 리다이렉트
        return <Navigate to="/week5/login" replace />;
    }
    // 로그인이 되어 있다면 자식 컴포넌트를 렌더링
    return <>{children}</>;
}

export default ProtectedRoute;
