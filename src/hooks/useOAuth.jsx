import { useCallback } from "react";
import { supabase } from "../supabaseClient";

export const useOAuth = () => {
  // 카카오 로그인
  const loginWithKakao = useCallback(
    async (redirectTo = null, ...otherOptions) => {
      try {
        await supabase.auth.signInWithOAuth({
          provider: "kakao",
          options: {
            redirectTo,
            ...otherOptions,
          },
        });
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        throw error;
      }
    },
    []
  );

  // 구글 로그인
  const loginWithGoogle = useCallback(
    async (redirectTo = null, ...otherOptions) => {
      try {
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo,
            ...otherOptions,
          },
        });
      } catch (error) {
        console.error("구글 로그인 실패:", error);
        throw error;
      }
    },
    []
  );

  return { loginWithKakao, loginWithGoogle };
};
