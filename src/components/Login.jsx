import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { getErrorMessage, validateField } from "../utils/validation";
import { InputField } from "./InputField";
export const Login = () => {
  const loginForm = useRef();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const [loginUserInfo, setLoginUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errorType, setErrorType] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithKakao, loginWithGoogle } = useSupabaseAuth();

  const requestLogin = async (e) => {
    e.preventDefault();
    const isValid = Object.values(errorType).every((val) => val === "");
    if (!isValid) return;
    const { email, password } = loginUserInfo;
    const { data, error } = await login({ email, password });
    // console.log("✅ 로그인 응답:", data, error);
    if (!error) {
      navigate("/");
    } else {
      setAuthError("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const changeValue = (e) => {
    const { name, value } = e.target;
    const nextUserInfo = { ...loginUserInfo, [name]: value };
    setLoginUserInfo(nextUserInfo);
    const error = validateField(name, value, nextUserInfo);
    setErrorType((prev) => ({ ...prev, [name]: error }));
    setAuthError("");
  };

  return (
    <main className="h-[calc(80vh-74px)] flex items-center max-[820px]:h-[auto]">
      <div className="inner max-w-screen-md w-full bg-[#252525] px-[50px] py-[50px] max-[820px]:bg-[#1b1b1b] max-[820px]:px-[0px] max-[820px]:pt-[20px] max-[768px]:px-[20px]">
        <h2 className="text-[2rem] max-[820px]:hidden">로그인</h2>
        <h2 className="hidden max-[820px]:text-[2rem] max-[820px]:flex max-[820px]:justify-center ">
          <Link to="/" className="flex items-center">
            <span className="font-Pixgamer text-[2.4rem] font-black">OZ</span>
            <span className="logo text-[1.5rem]">무비</span>
          </Link>
        </h2>
        <form action="" method="post" ref={loginForm} onSubmit={requestLogin}>
          <fieldset className="mt-[30px]">
            <legend className="text-[1.2rem] mb-[30px] max-[820px]:hidden">
              OZ무비 계정으로 로그인
            </legend>
            {authError && (
              <div className="auth-error bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                {authError}
                {/* <button className="text-sm underline ml-2">
                  비밀번호 재설정
                </button> */}
              </div>
            )}
            <InputField
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일 주소를 입력하세요"
              value={loginUserInfo.email}
              onChange={changeValue}
              errorMessage={getErrorMessage("login", "email", errorType.email)}
            />
            <InputField
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={loginUserInfo.password}
              onChange={changeValue}
              errorMessage={getErrorMessage(
                "login",
                "password",
                errorType.password
              )}
            />
          </fieldset>
          <button className="p-[20px] mt-[20px] bg-[#6201e0] text-[#fff] w-full rounded-[30px] text-[1.2rem]  max-[820px]:p-[10px]">
            로그인
          </button>
          <div className="flex items-center justify-center gap-[10px] mt-[15px]">
            <p>OZ무비가 처음이신가요?</p>
            <Link
              to={`/signup`}
              className="text-[#FF2DF1] relative after:content-[''] after:bg-[#FF2DF1] after:absolute after:bottom-[1px] after:left-0 after:w-full after:h-[1px]"
            >
              간편가입
            </Link>
          </div>
          <p className="social-login">
            <span className="relative z-[1] bg-[#252525] text-[1.2rem] max-[820px]:bg-[#1b1b1b] max-[820px]:text-[1rem] max-[768px]:text-base">
              또는 다른 서비스 계정으로 로그인
            </span>
          </p>
          <div className="flex items-center justify-center gap-[15px] mt-[2rem]">
            <button
              type="button"
              onClick={() =>
                loginWithKakao("http://localhost:5173/oauth/callback")
              }
              className="kakao-login"
            >
              <img src="../../public/images/kakao.svg" alt="카카오로 로그인" />
            </button>
            <button
              type="button"
              onClick={() =>
                loginWithGoogle("http://localhost:5173/oauth/callback")
              }
              className="google-login"
            >
              <img src="../../public/images/google.svg" alt="구글로 로그인" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
