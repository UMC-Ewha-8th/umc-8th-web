import React from 'react';

const GoogleLoginButton = () => {
    const handleLogin = () => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_REDIRECT_URI;
        const scope = 'profile email';
        const responseType = 'token';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

        window.location.href = googleAuthUrl;
    };

    return (
        <button onClick={handleLogin} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;
