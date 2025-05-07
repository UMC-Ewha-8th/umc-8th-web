import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("username과 password를 모두 입력하세요");
      return;
    }

    if (username === "user" && password === "password") {
      login("your-auth-token");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-black">
        로그인 페이지입니다!
      </h1>
      <form className="flex flex-col items-center" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="text-gray-700 mb-6" htmlFor="username">
            Username:{" "}
          </label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-300 text-gray-800 px-6 py-2 mt-6 rounded-full hover:bg-gray-400 transition"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
