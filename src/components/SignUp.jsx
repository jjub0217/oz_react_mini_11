import { useRef, useState } from "react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { getErrorMessage, validateField } from "../utils/validation";
import { InputField } from "./InputField";

export const SignUp = () => {
  const formRef = useRef();

  const { signUp } = useSupabaseAuth();

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

    if (!error) {
      alert("회원가입 요청이 완료되었습니다. 이메일을 확인해주세요.");
    }
  };

  return (
    <main className="h-[calc(80vh-74px)] flex items-center">
      <div className="inner max-w-screen-md  w-full bg-[#252525] px-[50px] py-[50px]">
        <h2 className="text-[2rem] mb-[30px]">회원가입</h2>
        <form ref={formRef} onSubmit={requestSignUp}>
          <fieldset>
            <legend className="blind">회원가입 폼</legend>
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
          </fieldset>
          <button
            type="submit"
            className="p-[20px] mt-[25px] bg-[#6201e0] text-[#fff] w-full rounded-[30px] text-[1.2rem]"
          >
            회원가입
          </button>
        </form>
      </div>
    </main>
  );
};
