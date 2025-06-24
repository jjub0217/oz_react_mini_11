import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../constant/userInfoKey";
import { useAuth } from "../hooks/useAuth";
import { localStorageUtils } from "../utils/localStorage";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setItemToLocalStorage } = localStorageUtils();
  const { getUserInfo } = useAuth();
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const user = await getUserInfo();
      if (user) {
        setItemToLocalStorage(USER_INFO_KEY, user);
        navigate("/");
      } else {
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
}
