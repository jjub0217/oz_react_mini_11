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

  const login = async ({ email, password }) => {
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

  const updateNickname = async (nickname) => {
    const { error } = await supabase.auth.updateUser({
      data: { nickname },
    });

    if (error) {
      console.error("닉네임 변경 실패:", error.message);
      return null;
    }

    const { data, error: getUserError } = await supabase.auth.getUser();
    if (getUserError) {
      console.error("유저 정보 불러오기 실패:", getUserError.message);
      return null;
    }

    setUser(data.user);
    setItemToLocalStorage(USER_INFO_KEY, data.user);

    console.log("🧾 닉네임 변경 성공:", data.user.user_metadata.nickname);
    return data.user.user_metadata.nickname;
  };

  const updateProfileImage = async (file, userId) => {
    if (!file || !userId) return null;
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("유저 정보 가져오기 실패:", userError?.message);
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // console.log("업로드 시도 - 파일:", file);
    // console.log("업로드 경로:", filePath);

    // 1. Supabase Storage에 이미지 업로드
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        metadata: {
          owner: user.id, // 또는 supabase.auth.getUser().data.user.id
        },
      });

    if (uploadError) {
      console.error("이미지 업로드 실패:", uploadError.message);
      return null;
    }

    // console.log("✅ 이미지 업로드 성공");

    // 2. 이미지 URL 가져오기 (public URL 생성)
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    const publicUrl = publicUrlData?.publicUrl;
    console.log("📸 publicUrl:", publicUrl);

    // 3. user_metadata 업데이트
    const { error: updateError } = await supabase.auth.updateUser({
      data: { profileImage: publicUrl },
    });

    if (updateError) {
      console.error("프로필 정보 업데이트 실패:", updateError.message);
      return null;
    }

    // 4. 최신 유저 정보 받아오기
    const { data: userData, error: getUserError } =
      await supabase.auth.getUser();
    if (getUserError) {
      console.error("유저 정보 불러오기 실패:", getUserError.message);
      return null;
    }

    // 5. 상태와 localStorage 동기화
    setUser(userData.user);
    setItemToLocalStorage(USER_INFO_KEY, userData.user);

    return publicUrl;
  };

  const updateBackgroundImage = async (file, userId) => {
    if (!file || !userId) return null;

    const ext = file.name.split(".").pop();
    const filePath = `backgrounds/bg_${userId}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("backgrounds")
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      console.error("Background upload failed:", uploadError.message);
      return null;
    }

    const { data: publicUrlData } = await supabase.storage
      .from("backgrounds")
      .getPublicUrl(filePath);
    const publicUrl = publicUrlData?.publicUrl;
    if (!publicUrl) {
      console.error("Failed to get publicUrl");
      return null;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: { backgroundImage: publicUrl },
    });
    if (updateError) {
      console.error("Metadata update failed:", updateError.message);
      return null;
    }

    const { data: fresh, error: getUserErr } = await supabase.auth.getUser();
    if (!getUserErr && fresh?.user) {
      setUser(fresh.user);
      setItemToLocalStorage(USER_INFO_KEY, fresh.user);
    }

    return publicUrl;
  };

  const getUserInfo = async () => {
    const cachedUser = getItemFromLocalStorage(USER_INFO_KEY);
    if (cachedUser) {
      setUser(cachedUser);
      return cachedUser;
    }

    const { data, error } = await supabase.auth.getUser();
    console.log(data);

    if (!error && data?.user) {
      setUser(data.user);
      setItemToLocalStorage(USER_INFO_KEY, data.user);
      return data.user;
    }

    return null;
  };

  return {
    signUp,
    login,
    logout,
    getUserInfo,
    isLoading,
    updateProfileImage,
    updateBackgroundImage,
    authError,
    updateNickname,
    user,
  };
};
