import { useAuth } from "./useAuth";
import { useOAuth } from "./useOAuth";

export const useSupabaseAuth = () => {
  const {
    signUp,
    login,
    logout,
    getUserInfo,
    updateNickname,
    updateProfileImage,
    updateBackgroundImage,
    user,
  } = useAuth();
  const { loginWithGoogle, loginWithKakao } = useOAuth();

  return {
    login,
    signUp,
    logout,
    getUserInfo,
    updateNickname,
    updateProfileImage,
    updateBackgroundImage,
    user,
    loginWithKakao,
    loginWithGoogle,
  };
};
