import { MovieCard } from "./MovieCard";
import { MovieTop } from "./MovieTop";

export const Main = ({ popularList, topMovieList }) => {
  return (
    <main>
      {popularList.length === 0 ? (
        <p>영화 데이터를 불러오는 중입니다...</p>
      ) : (
        <>
          <section className="movie-top">
            <MovieTop topMovieList={topMovieList} />
          </section>
          <section className="">
            <div className="inner">
              <h2 className="font-bold text-[1.1rem] mb-[10px] text-left">
                새로 올라온 영화
              </h2>
              <ul className="main-movie__list">
                {popularList.map((el) => (
                  <MovieCard key={el.id} {...el} />
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </main>
  );
};
