import { ERROR_MESSAGES } from "../constant/errorMessages";

// 각 필드의 유효성 검사
export const validateField = (name, value, userInfo) => {
  if (name !== "confirmPassword") {
    if (value === "") return "noText";
    if (/\s/.test(value)) return "blankInText";
    if (name === "email" && !value.includes("@")) return "wrongEmail";
    if (name === "password" && value.length < 8) return "tooShort";
    if (name === "name" && (value.length < 2 || value.length > 8))
      return "wrongLength";

    return "";
  }
  if (value !== userInfo.password) return "notMatch";
  return "";
};

// 에러 메시지 추출
export const getErrorMessage = (pageType, field, errorType) =>
  ERROR_MESSAGES[pageType]?.[field]?.[errorType] || "";
