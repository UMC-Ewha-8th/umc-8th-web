import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { postSignup } from '../apis/auth'

const schema = z.object( {
  email: z.string().email("이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다.").
   max(20, "비밀번호는 최대 20자까지 가능합니다."),
  passwordCheck: z
  .string().min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .max(20, "비밀번호는 최대 20자까지 가능합니다."),

  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
})
.refine((data)=> data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  })


type FormFields = z.infer<typeof schema>

const SignupPage = () => {
  const {register, 
      handleSubmit, 
      formState:{errors, isSubmitting},
    
        } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const onSubmit:SubmitHandler<FormFields> = async(data) => {
    const {passwordCheck, ...rest} = data;

    const response = await postSignup(rest)

    console.log(response)
    // await signup(data)
  }

  return (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <div className="text-2xl font-bold p-[13px]">회원가입</div>
    <button className="border w-[300px] p-[13px] focus:border-[#807bff] rounded-lg">구글 회원가입</button>
    --- OR ---
    <div className="flex flex-col gap-3">
      
      <input 
      {...register("email")}
      type={"email"} 
      className={`border border-[#ccc] w-[300px] p-[18px] focus:border-[#807bff] rounded-sm
        ${errors?.email ? "bordeer-red-500 bg-red-200" : "border-gray-300"}`}
      placeholder='이메일'
      />

      {errors?.email && (
        <div className={"text-red-500 text-sm"}>{errors.email.message}</div>)}
      
      <input 
      {...register("password")}
      type={"password"} 
      className={`border border-[#ccc] w-[300px] p-[18px] focus:border-[#807bff] rounded-sm
        ${errors?.password ? "bordeer-red-500 bg-red-200" : "border-gray-300"}`}
      placeholder='비밀번호'
      />

      {errors?.password && (
        <div className={"text-red-500 text-sm"}>{errors.password.message}</div>)}

      <input 
      {...register("passwordCheck")}
      type={"password"} 
      className={`border border-[#ccc] w-[300px] p-[18px] focus:border-[#807bff] rounded-sm
        ${errors?.passwordCheck ? "bordeer-red-500 bg-red-200" : "border-gray-300"}`}
      placeholder='비밀번호 확인'
      />

      {errors?.passwordCheck && (
        <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>)}
      


      <input 
      {...register("name")}
      type={"name"} 
      className={`border border-[#ccc] w-[300px] p-[18px] focus:border-[#807bff] rounded-sm
        ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
      placeholder='이름'
      />

      {errors?.name && (
        <div className={"text-red-500 text-sm"}>{errors.name.message}</div>)}
      

      <button

      className="w-full bg-blue-600 text-white py-3 rounded-md 
      text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
       type='button' 
       onClick={handleSubmit(onSubmit)} 
       disabled={isSubmitting}>회원가입</button>

    </div>
    </div>
  )
}

export default SignupPage
