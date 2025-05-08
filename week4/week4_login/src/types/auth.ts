import type { CommonResponse } from "./common.ts"

export type RequestUser ={
    "name": string,
    "email": string,
    "bio"?: string,
    "avatar"?: string,
    "password": string
  }

export type RequestSignupDto = {
    name: string;
    email: string;
    password: string;
    passwordCheck: string;
}

  export type ResponseSignupDto = CommonResponse<{
    id: number,
    name: string,
    email: string,
    bio: string | null,
    avatar: string | null,
    createdAt: Date,
    updatedAt: Date
  }>
    
// 로그인

export type RequestSigninDto = {
    email: string;
    password: string;

}

export type ResponseSigninDto = CommonResponse<{
    id: number,
    name: string,
    accessToken: string,
    refreshToken: string,
}>

// 내 정보 조호ㅚ

export type ResponseMyInfoDto = CommonResponse<{
    id: number,
    name: string,
    email: string,
    bio: string | null,
    avatar: string | null,
    createdAt: Date,
    updatedAt: Date
}>
