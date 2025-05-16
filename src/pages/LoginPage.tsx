import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
    const { login } = useAuth();

    const handleLogin = () => {
        login();
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
