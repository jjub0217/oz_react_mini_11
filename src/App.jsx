import { useEffect, useState } from "react";
import "./App.scss";
import { MovieCard } from "./components/MovieCard";
import MoviePopular from "./components/MoviePopular";
import movieListData from "./data/movieListData.json";

function App({ IMAGE_BASE_URL }) {
  const [originalList, setOriginalList] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    // setMovieList(movieListData.results);
    const original = movieListData.results;
    const sorted = [...original].sort((a, b) => b.popularity - a.popularity);

    setOriginalList(original);
    setSortedList(sorted);
  }, []);

  return (
    <>
      <main>
        {originalList.length === 0 ? (
          <p>영화 데이터를 불러오는 중입니다...</p>
        ) : (
          <>
            <section className="section-popular">
              <MoviePopular
                sortedList={sortedList}
                IMAGE_BASE_URL={IMAGE_BASE_URL}
              />
            </section>
            <section className="max-w-screen-xl">
              <h2 className="text-[#fff] font-bold text-[1.1rem] mb-[10px]">
                새로 올라온 영화
              </h2>
              <ul className="flex flex-wrap gap-[20px] justify-start">
                {originalList.map((el) => (
                  <MovieCard
                    key={el.id}
                    IMAGE_BASE_URL={IMAGE_BASE_URL}
                    {...el}
                  />
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;
