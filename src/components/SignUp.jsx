import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { getErrorMessage, validateField } from "../utils/validation";
import { InputField } from "./InputField";

export const SignUp = () => {
  const formRef = useRef();
  const navigate = useNavigate();

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

  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

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
    // console.log("✅ Supabase 응답:", data, error);

    if (!error) {
      setIsSignUpSuccess(true);
      // alert("회원가입 요청이 완료되었습니다. 이메일을 확인해주세요.");
      // navigate("/");
    }
  };

  return (
    <main className="h-[calc(80vh-74px)] flex items-center">
      {!isSignUpSuccess && (
        <div className="inner max-w-screen-md w-full bg-[#252525] px-[50px] py-[50px] rounded-[20px]">
          <>
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
                  errorMessage={getErrorMessage(
                    "signup",
                    "email",
                    errorType.email
                  )}
                />
                <InputField
                  pageType="signup"
                  label="이름"
                  name="name"
                  type="text"
                  placeholder="2~8자, 숫자, 한글, 영어만 사용"
                  value={userInfo.name}
                  onChange={changeValue}
                  errorMessage={getErrorMessage(
                    "signup",
                    "name",
                    errorType.name
                  )}
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
          </>
        </div>
      )}
      {isSignUpSuccess && (
        <div className="inner flex flex-col items-center welcome max-w-screen-md w-full mt-[30px] px-[50px] py-[50px] bg-[#252525] rounded-[20px] text-center text-white shadow-lg">
          <h2 className="text-[1.5rem] mb-[30px]">
            🎉 회원가입이 완료되었습니다!
          </h2>
          <p className="text-[1.1rem] font-semibold mb-[10px]">
            OZ무비에 오신 걸 환영합니다!
          </p>
          <p className="mb-[25px] text-[0.95rem] leading-[1.5] text-[#ccc]">
            지금 바로 로그인하고, 나만의 영화 기록을 시작해보세요 🎬
            <br />
            (마이페이지에서 프로필 이미지를 변경할 수 있습니다.)
          </p>
          <div className="flex justify-center gap-[10px]">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#6201e0] text-white px-[20px] py-[10px] rounded-[10px] text-[0.95rem]"
            >
              로그인 하러 가기
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#666] text-white px-[20px] py-[10px] rounded-[10px] text-[0.95rem]"
            >
              홈으로 가기
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
