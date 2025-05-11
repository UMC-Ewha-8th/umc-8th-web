import useForm from "../assets/hooks/useForm";
import { UserSignInformation, validateSignin } from "../utils/validate";

const LogInPage = () => {
  const { values, errors, touched, getInputProps } =
    useForm<UserSignInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    console.log(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => (error as string).length > 0) ||
    Object.values(values).some((value) => (value as string) === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일을 입력하세요"
        />
        {errors?.email && touched.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        {errors?.password && touched.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="bg-[#807bff] text-white w-[300px] p-[10px] rounded-sm cursor-pointer hover:bg-[#807bff]/80 transition-colors disabled:bg-[#807bff]/50 disabled:cursor-not-allowed"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-[#807bff] text-white w-[300px] p-[10px] rounded-sm cursor-pointer hover:bg-[#807bff]/80 transition-colors"
        >
          <div className="flex items-center justify-center gap-2">
            <img src={"/images/google.svg"} alt="Google Logo" />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LogInPage;
