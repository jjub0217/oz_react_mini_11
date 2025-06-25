import { ERROR_MESSAGES } from "../constant/errorMessages";

// 각 필드의 유효성 검사
export const validateField = (name, value, userInfo) => {
  if (name !== "confirmPassword") {
    if (value === "") return "noText";
    if (/\s/.test(value)) return "blankInText";
    if (name === "email" && !value.includes("@")) return "wrongEmail";
    if (name === "password") {
      const onlyAllowedChars = /^[a-zA-Z0-9]+$/.test(value); // 허용된 문자만 포함
      const hasUpper = /[A-Z]/.test(value); // 대문자 포함
      const hasLower = /[a-z]/.test(value); // 소문자 포함
      const hasNumber = /[0-9]/.test(value); // 숫자 포함

      if (!onlyAllowedChars || !hasUpper || !hasLower || !hasNumber) {
        return "invalidPassword";
      }
    }
    if (name === "name") {
      const isWrongLength = value.length < 2 || value.length > 8;
      const hasInvalidChar = !/^[0-9a-zA-Z가-힣]+$/.test(value);

      if (isWrongLength || hasInvalidChar) return "invalidName";
    }

    return "";
  }
  if (value !== userInfo.password) return "notMatch";
  return "";
};

// 에러 메시지 추출
export const getErrorMessage = (pageType, field, errorType) =>
  ERROR_MESSAGES[pageType]?.[field]?.[errorType] || "";
