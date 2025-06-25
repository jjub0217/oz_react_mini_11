import { useState } from "react";
import { USER_INFO_KEY } from "../constant/userInfoKey";
import { useSupabase } from "../context/SupabaseContext";
import { localStorageUtils } from "../utils/localStorage";

export const useAuth = () => {
  const {
    setItemToLocalStorage,
    getItemFromLocalStorage,
    removeItemFromLocalStorage,
  } = localStorageUtils();

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { supabase, user, setUser } = useSupabase();

  const signUp = async ({ email, password, name }) => {
    setIsLoading(true);
    setAuthError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      console.error("회원가입 실패:", error.message);
      setAuthError(error.message);
    } else {
      console.log("✅ 회원가입 성공");
      // setUser(data.user);
      // setItemToLocalStorage(USER_INFO_KEY, data.user);
    }

    setIsLoading(false);
    return { data, error };
  };

  const Login = async ({ email, password }) => {
    setIsLoading(true);
    setAuthError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setUser(data.user);
      setItemToLocalStorage(USER_INFO_KEY, data.user);
    }

    setIsLoading(false);
    return { data, error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      console.log("✅ 로그아웃 성공");
      setUser(null);
      removeItemFromLocalStorage(USER_INFO_KEY);
    } else {
      console.error("로그아웃 실패:", error.message);
    }
    return { error };
  };

  const getUserInfo = async () => {
    const cachedUser = getItemFromLocalStorage(USER_INFO_KEY);
    if (cachedUser) {
      setUser(cachedUser);
      return cachedUser;
    }

    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      setUser(data.user);
      setItemToLocalStorage(USER_INFO_KEY, data.user);
      return data.user;
    }

    return null;
  };

  return {
    signUp,
    Login,
    logout,
    getUserInfo,
    isLoading,
    authError,
    user,
  };
};
