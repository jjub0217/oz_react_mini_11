import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { getErrorMessage, validateField } from "../utils/validation";
import { InputField } from "./InputField";

export const Login = () => {
  const loginForm = useRef();
  const navigate = useNavigate();

  const [loginUserInfo, setLoginUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errorType, setErrorType] = useState({
    email: "",
    password: "",
  });

  const { Login, loginWithKakao, loginWithGoogle } = useSupabaseAuth();

  const requestLogin = async (e) => {
    e.preventDefault();
    const isValid = Object.values(errorType).every((val) => val === "");
    if (!isValid) return;
    const { email, password } = loginUserInfo;
    const { data, error } = await Login({ email, password });
    console.log("✅ 로그인 응답:", data, error);
    if (!error) {
      navigate("/");
    }
  };

  const changeValue = (e) => {
    const { name, value } = e.target;
    const nextUserInfo = { ...loginUserInfo, [name]: value };
    setLoginUserInfo(nextUserInfo);
    const error = validateField(name, value, nextUserInfo);
    setErrorType((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <main>
      <div className="inner max-w-screen-lg">
        <h1>로그인</h1>
        <form action="" method="post" ref={loginForm} onSubmit={requestLogin}>
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
          <button>로그인</button>
          <div>
            <p>OZ무비가 처음이신가요?</p>
            <Link to={`/signup`}>간편가입</Link>
          </div>
          <p>또는 다른 서비스 계정으로 로그인</p>
          <button
            type="button"
            onClick={() =>
              loginWithKakao("http://localhost:5173/oauth/callback")
            }
          >
            카카오로 로그인
          </button>
          <button
            type="button"
            onClick={() =>
              loginWithGoogle("http://localhost:5173/oauth/callback")
            }
          >
            Google로 로그인
          </button>
        </form>
      </div>
    </main>
  );
};
