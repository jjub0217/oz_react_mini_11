import { useSupabase } from "../context/SupabaseContext";

export default function FavoriteButton({ movieId, movieData }) {
  const { user, favoriteList, setFavoriteList } = useSupabase();

  const isFavorite =
    Array.isArray(favoriteList) &&
    favoriteList.some((movie) => movie.id === movieId);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    setFavoriteList((prev) => {
      if (!Array.isArray(prev)) return [movieData];

      // 배열 안에 해당 movieId를 가진 영화가 존재하는지 확인
      const isAlreadyFavorite = prev.some((movie) => movie.id === movieId);
      // true면 이미 좋아요를 눌렀다는 뜻 → 제거
      // false면 아직 없다는 뜻 → 추가
      return isAlreadyFavorite
        ? prev.filter((movie) => movie.id !== movieId)
        : [...prev, movieData];
    });
  };
  return (
    <button
      type="button"
      className={`absolute z-auto text-[24px] ${
        isFavorite ? "text-red-500" : "text-gray-400"
      }`}
      onClick={toggleFavorite}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
