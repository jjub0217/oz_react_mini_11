import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        // console.error("세션 불러오기 실패:", error.message);
        navigate("/login");
        return;
      }

      if (data?.session) {
        // console.log("✅ 로그인 성공:", data.session);
        navigate("/");
      } else {
        // console.warn("세션 없음. 다시 로그인 해주세요.");
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
}
해석: 복호화;
