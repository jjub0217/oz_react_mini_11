import { useState } from "react";
import { supabase } from "../supabaseClient";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

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
      setAuthError(error.message);
    } else {
      setUser(data.user);
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
    }

    setIsLoading(false);
    return { data, error };
  };

  return {
    signUp,
    Login,
    isLoading,
    authError,
    user,
  };
};
export default useAuth;
