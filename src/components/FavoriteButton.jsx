import { useMemo } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { useSupabaseFavorite } from "../hooks/useSupabaseFavorite";

export default function FavoriteButton({ movieId, movieData }) {
  const { user, favoriteList, setFavoriteList, setShowLoginGuide } =
    useSupabase();

  const { insertFavorite, deleteFavorite } = useSupabaseFavorite();

  const isFavorite = useMemo(() => {
    return favoriteList?.some((movie) => movie.id === movieId);
  }, [favoriteList, movieId]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowLoginGuide(true); // 전역 상태 변경
      return;
    }

    const userId = user.id;

    setFavoriteList((prev) => {
      if (!Array.isArray(prev)) return [{ ...movieData, id: movieId }];

      // 배열 안에 해당 movieId를 가진 영화가 존재하는지 확인
      const isAlreadyFavorite = prev.some((movie) => movie.id === movieId);
      // true면 이미 좋아요를 눌렀다는 뜻 → 제거
      // false면 아직 없다는 뜻 → 추가
      return isAlreadyFavorite
        ? prev.filter((movie) => movie.id !== movieId)
        : [...prev, { ...movieData, id: movieId }];
    });

    if (isFavorite) {
      await deleteFavorite(userId, movieId);
    } else {
      await insertFavorite(userId, movieId, movieData);
    }
  };

  return (
    <button
      type="button"
      className={`favorite-btn absolute z-auto rounded-full bg-white/40 shadow-md flex items-center justify-center `}
      onClick={toggleFavorite}
    >
      {/* {isFavorite ? "♥" : "♡"} */}
      {isFavorite ? (
        <div className="bookmark">
          <img src="/images/full-bookmark.png" alt="찜함" />
        </div>
      ) : (
        <div className="bookmark">
          <img src="/images/empty-bookmark.png" alt="찜 안함" />
        </div>
      )}
    </button>
  );
}
