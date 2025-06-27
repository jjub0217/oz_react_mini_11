import { useSupabase } from "../context/SupabaseContext";

export default function FavoriteButton({ movieId, movieData }) {
  const { user, favoriteList, setFavoriteList, setShowLoginGuide } =
    useSupabase();
  const isFavorite =
    Array.isArray(favoriteList) &&
    favoriteList.some((movie) => movie.id === movieId);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowLoginGuide(true); // 전역 상태 변경
      return;
    }

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
      className={`absolute z-auto right-[10px] top-[10px] w-[3rem] h-[3rem] rounded-full bg-white/40 shadow-md flex items-center justify-center `}
      onClick={toggleFavorite}
    >
      {/* {isFavorite ? "♥" : "♡"} */}
      {isFavorite ? (
        <div className="w-[2rem] h-[2rem] bookmark">
          <img src="/images/full-bookmark.png" alt="찜함" />
        </div>
      ) : (
        <div className="w-[2rem] h-[2rem] bookmark">
          <img src="/images/empty-bookmark.png" alt="찜 안함" />
        </div>
      )}
    </button>
  );
}
