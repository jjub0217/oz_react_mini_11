// components/MyFavorite.jsx
import { useOutletContext } from "react-router-dom";
import { MovieCard } from "./MovieCard";

export default function MyFavorite() {
  const { favoriteList } = useOutletContext();

  return (
    <div className="h-[100%] overflow-hidden my-favorite">
      <section className="h-[100%]">
        {favoriteList.length === 0 ? (
          <div className="no-favorite text-center border border-dashed rounded-xl p-6 mt-10">
            <p className="text-[1.5rem] mb-2">💔 찜한 영화가 없어요</p>
            <p className="text-[1rem] opacity-70">
              마음에 드는 영화를 찾아 찜해보세요!
            </p>
          </div>
        ) : (
          <ul className="movie-list grid grid-cols-9 gap-[1rem] h-[100%] overflow-y-scroll">
            {favoriteList.map((el) => (
              <MovieCard key={el.id} {...el} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
