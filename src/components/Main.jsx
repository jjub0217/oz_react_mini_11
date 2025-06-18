import { MovieCard } from "./MovieCard";
import { MoviePopular } from "./MoviePopular";

export const Main = ({ popularList, sortedList }) => {
  return (
    <main>
      {popularList.length === 0 ? (
        <p>영화 데이터를 불러오는 중입니다...</p>
      ) : (
        <>
          <section className="section-popular">
            <MoviePopular sortedList={sortedList} />
          </section>
          <section>
            <div className="inner">
              <h2 className="text-[#fff] font-bold text-[1.1rem] mb-[10px] text-left">
                새로 올라온 영화
              </h2>
              <ul className="grid gap-[10px] grid-cols-[repeat(8,0.2fr)] justify-start">
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
