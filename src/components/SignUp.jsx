import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getErrorMessage, validateField } from "../utils/validation";
import { InputField } from "./InputField";

export const SignUp = () => {
  const formRef = useRef();
  const { signUp, isLoading, authError } = useAuth();

  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errorType, setErrorType] = useState({
    email: "noText",
    name: "noText",
    password: "noText",
    confirmPassword: "notMatch",
  });

  const [signupError, setSignupError] = useState("");

  const changeValue = (e) => {
    const { name, value } = e.target;
    const nextUserInfo = { ...userInfo, [name]: value };
    setUserInfo(nextUserInfo);
    const error = validateField(name, value, nextUserInfo);
    setErrorType((prev) => ({ ...prev, [name]: error }));
  };

  const requestSignUp = async (e) => {
    e.preventDefault();

    const isValid = Object.values(errorType).every((val) => val === "");
    if (!isValid) return;

    const { email, password, name } = userInfo;
    const { data, error } = await signUp({ email, password, name });
    console.log("✅ Supabase 응답:", data, error);

    if (error) {
      setSignupError(error.message); // ✅ 에러 표시용
    } else {
      alert("회원가입 요청이 완료되었습니다. 이메일을 확인해주세요.");
      // 필요 시 로그인 페이지로 이동
    }
  };

  return (
    <main>
      <div className="inner max-w-screen-lg">
        <h1>회원가입</h1>
        <form ref={formRef} onSubmit={requestSignUp}>
          <InputField
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일 주소를 입력하세요"
            value={userInfo.email}
            onChange={changeValue}
            errorMessage={getErrorMessage("signup", "email", errorType.email)}
          />
          <InputField
            pageType="signup"
            label="이름"
            name="name"
            type="text"
            placeholder="2~8자, 숫자, 한글, 영어만 사용"
            value={userInfo.name}
            onChange={changeValue}
            errorMessage={getErrorMessage("signup", "name", errorType.name)}
          />
          <InputField
            pageType="signup"
            label="비밀번호"
            name="password"
            type="password"
            placeholder="영문 대문자/소문자 + 숫자의 조합 사용"
            value={userInfo.password}
            onChange={changeValue}
            errorMessage={getErrorMessage(
              "signup",
              "password",
              errorType.password
            )}
          />
          <InputField
            pageType="signup"
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={userInfo.confirmPassword}
            onChange={changeValue}
            errorMessage={getErrorMessage(
              "signup",
              "confirmPassword",
              errorType.confirmPassword
            )}
          />
          {signupError && <p className="text-[red] text-sm">{signupError}</p>}
          <button type="submit">회원가입</button>
        </form>
      </div>
    </main>
  );
};
