import { useSupabase } from "../context/SupabaseContext";

export const useSupabaseFavorite = () => {
  const { supabase } = useSupabase();

  const insertFavorite = async (userId, movieId, movieData) => {
    const { error } = await supabase.from("favorite_movies").insert({
      user_id: userId,
      movie_id: movieId,
      movie_data: movieData,
    });
    if (error) {
      console.error("🎬 즐겨찾기 추가 실패:", error.message);
    }
  };

  const deleteFavorite = async (userId, movieId) => {
    const { error } = await supabase
      .from("favorite_movies")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (error) {
      console.error("🗑️ 즐겨찾기 삭제 실패:", error.message);
    }
  };

  const fetchFavorites = async (userId) => {
    const { data, error } = await supabase
      .from("favorite_movies")
      .select("movie_data, movie_id")
      .eq("user_id", userId);

    if (error) {
      console.error("❌ 즐겨찾기 불러오기 실패:", error.message);
      return [];
    }

    return data.map((item) => ({
      ...item.movie_data,
      id: item.movie_id, // 명시적으로 id 설정
    }));
  };

  return { insertFavorite, deleteFavorite, fetchFavorites };
};
