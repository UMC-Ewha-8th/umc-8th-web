import React, { useEffect } from 'react'
import { useState } from 'react'
import useForm from '../hooks/useForm';
import type { UserSigninInformation } from '../utils/validate';
import { validateSignin } from '../utils/validate';
import { postSignin } from '../apis/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const {login, accessToken} = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [ navigate, accessToken])


  const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });


  const handleSubmit = async () => {
    try {
      await login(values);
      navigate('/mypage');
    } catch (error) {
      console.error("로그인 실패:", error);
      navigate('/login')
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"
  }
  
const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) ||
  Object.values(values).some((value) => value === "");

const { setUser } = useAuth();

  return (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <div className="text-2xl font-bold p-[13px]">로그인</div>
    <button className="border w-[300px] p-[13px] focus:border-[#807bff] rounded-lg"
    onClick={handleGoogleLogin} 
    >구글 로그인</button>
    --- OR ---
    <div className="flex flex-col gap-3">
      <input 
      {...getInputProps("email")}

      type={"email"} 
      className={`border border-[#ccc] w-[300px] p-[18px] focus:border-[#807bff] rounded-sm
        ${errors?.email && touched?.email ? "bordeer-red-500 bg-red-200" : "border-gray-300"}`}
      placeholder='이메일'
      />
      {errors?.email && touched?.email && (
        <div className="text-red-500 text-sm">{errors.email}</div>
      )}
      
      <input 
      {...getInputProps("password")}
      type={"password"} 
      className={`border border-[#ccc] w-[300px] p-[18px] focus:border-[#807bff] rounded-sm
        ${errors?.password && touched?.password ? "bordeer-red-500 bg-red-200" : "border-gray-300"}`}
      placeholder='비밀번호'
      />
      {errors?.password && touched?.password && (
        <div className="text-red-500 text-sm">{errors.password}</div>
      )}

      <button
      className="w-full bg-blue-600 text-white py-3 rounded-md 
      text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
       type='button' 
       onClick={handleSubmit} 
       disabled={isDisabled}>로그인</button>

    </div>
  </div>
  )
}

export default LoginPage
