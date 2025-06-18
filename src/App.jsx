import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import { Main } from "./components/Main";
import { MovieDetail } from "./components/MovieDetail";
import { API_URL } from "./constant/imageBaseUrl";
import useFetch from "./hooks/useFetch";

function App() {
  const [popularList, setPopularList] = useState([]);

  const { isLoading, results } = useFetch(
    `${API_URL}/movie/popular?language=ko-KR&page=1`
  );

  useEffect(() => {
    if (results.length !== 0) {
      const popularMovieList = results.filter((el) => el.adult === false);
      setPopularList(popularMovieList);
    }
  }, [results]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main popularList={popularList} />} />
          {/* <Route path="/" element={<App IMAGE_BASE_URL={IMAGE_BASE_URL} />} /> */}
          <Route
            path={`/detail/:id`}
            element={<MovieDetail popularList={popularList} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
