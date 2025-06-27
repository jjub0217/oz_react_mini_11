// components/MyFavorite.jsx
import { useSupabase } from "../context/SupabaseContext";
import { MovieCard } from "./MovieCard";

export default function MyFavorite() {
  const { favoriteList } = useSupabase();

  return (
    <section className="h-[100%]">
      {favoriteList.length === 0 ? (
        <p>아직 좋아요 누른 영화가 없습니다.</p>
      ) : (
        <ul className="movie-list grid grid-cols-9 gap-[1rem] h-[100%] overflow-y-scroll">
          {favoriteList.map((el) => (
            <MovieCard key={el.id} {...el} />
          ))}
        </ul>
      )}
    </section>
  );
}
