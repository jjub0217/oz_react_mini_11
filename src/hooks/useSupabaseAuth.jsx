import { useAuth } from "./useAuth";
import { useOAuth } from "./useOAuth";

export const useSupabaseAuth = () => {
  const { signUp, login, logout, getUserInfo, user } = useAuth();
  const { loginWithGoogle, loginWithKakao } = useOAuth();

  return {
    login,
    signUp,
    logout,
    getUserInfo,
    user,
    loginWithKakao,
    loginWithGoogle,
  };
};
