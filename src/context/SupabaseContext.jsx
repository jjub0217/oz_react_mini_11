import { createContext, useContext, useState } from "react";
import { supabaseClient } from "../supabaseClient";

const SUPABASE = createContext(null);

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  return (
    <SUPABASE.Provider
      value={{
        supabase: supabaseClient,
        user,
        setUser,
        favoriteList,
        setFavoriteList,
      }}
    >
      {children}
    </SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);

  if (!supabase) {
    throw new Error("Supabase가 초기화되지 않았습니다.");
  }

  return supabase;
};
