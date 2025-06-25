import { useAuth } from "./useAuth";
import { useOAuth } from "./useOAuth";

export const useSupabaseAuth = () => {
  const { signUp, Login, logout, getUserInfo, user } = useAuth();
  const { loginWithGoogle, loginWithKakao } = useOAuth();

  return {
    Login,
    signUp,
    logout,
    getUserInfo,
    user,
    loginWithKakao,
    loginWithGoogle,
  };
};
