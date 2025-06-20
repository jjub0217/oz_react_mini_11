import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import { Main } from "./components/Main";
import { MovieDetail } from "./components/MovieDetail";
import { MovieSearch } from "./components/MovieSearch";
import { API_URL } from "./constant/imageBaseUrl";
import useFetch from "./hooks/useFetch";

function App() {
  const [popularList, setPopularList] = useState([]);
  const [topMovieList, setTopMovieList] = useState([]);

  const { data } = useFetch(`${API_URL}/movie/popular?language=ko-KR&page=1`);
  const { data: topList } = useFetch(
    `${API_URL}/movie/top_rated?language=en-US&page=1`
  );

  useEffect(() => {
    if (!data || !data.results || !topList || !topList.results) return;
    const popularMovieList = data.results.filter((el) => el.adult === false);
    setPopularList(popularMovieList);
    const topRatedMovieList = topList.results.filter(
      (el) => el.adult === false
    );
    setTopMovieList(topRatedMovieList);
  }, [data, topList]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Main popularList={popularList} topMovieList={topMovieList} />
            }
          />
          <Route path={`/detail/:id`} element={<MovieDetail />} />
          <Route
            path={`/search`}
            element={<MovieSearch popularList={popularList} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
