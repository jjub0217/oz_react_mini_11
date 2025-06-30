import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { MovieDetail } from "./components/MovieDetail";
import { MovieSearch } from "./components/MovieSearch";
import MyFavorite from "./components/MyFavorite";
import { MyPage } from "./components/MyPage";
import { MyPageHome } from "./components/myPageHome";
import { MyProfile } from "./components/MyProfile";
import { MyReview } from "./components/MyReview";
import OAuthCallback from "./components/OAuthCallback";
import { PopularPage } from "./components/PopularPage";
import { SignUp } from "./components/SignUp";
import { SisunZip } from "./components/Sisunzip";
import { API_URL } from "./constant/imageBaseUrl";
import { useAuth } from "./hooks/useAuth";
import useFetch from "./hooks/useFetch";

function App() {
  const [popularList, setPopularList] = useState([]);
  const [topMovieList, setTopMovieList] = useState([]);
  const [playingMovieList, setPlayingMovieList] = useState([]);
  const [upComingMovieList, setUpComingMovieList] = useState([]);
  const [trendingPeopleList, setTrendingPeopleList] = useState([]);

  const { getUserInfo } = useAuth();

  useEffect(() => {
    // 앱 시작 시 LocalStorage에 저장된 유저 정보 → 전역 상태로 저장
    getUserInfo();
  }, []);

  const { data: popularData } = useFetch(
    `${API_URL}/movie/popular?language=ko&page=1`
  );
  const { data: topData } = useFetch(
    `${API_URL}/movie/top_rated?language=en-US&page=1`
  );
  const { data: playingList } = useFetch(
    `${API_URL}/movie/now_playing?language=ko&page=1`
  );
  const { data: upComingList } = useFetch(
    `${API_URL}/movie/upcoming?language=ko&page=1`
  );
  const { data: trendingData } = useFetch(
    `${API_URL}/person/popular?language=ko&page=1`
  );

  useEffect(() => {
    if (topData?.results) {
      setTopMovieList(topData.results.filter((el) => !el.adult));
    }
  }, [topData]);

  useEffect(() => {
    if (popularData?.results) {
      setPopularList(popularData.results.filter((el) => !el.adult));
    }
  }, [popularData]);

  useEffect(() => {
    if (playingList?.results) {
      setPlayingMovieList(playingList.results.filter((el) => !el.adult));
    }
  }, [playingList]);

  useEffect(() => {
    if (upComingList?.results) {
      setUpComingMovieList(upComingList.results.filter((el) => !el.adult));
    }
  }, [upComingList]);

  useEffect(() => {
    if (trendingData?.results) {
      const list = trendingData.results.filter(
        (el) =>
          !el.adult &&
          el.known_for_department !== null &&
          el.known_for.length !== 0
      );

      setTrendingPeopleList(list.filter((el) => el.profile_path));
    }
  }, [trendingData]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Main
                popularList={popularList}
                topMovieList={topMovieList}
                playingMovieList={playingMovieList}
                upComingMovieList={upComingMovieList}
                trendingPeopleList={trendingPeopleList}
              />
            }
          />
          <Route path={`/detail/:id`} element={<MovieDetail />} />
          <Route
            path={`/search`}
            element={<MovieSearch popularList={popularList} />}
          />
          <Route path={`/sisunzip`} element={<SisunZip />} />
          <Route path={`/login`} element={<Login />} />
          <Route path={`/signup`} element={<SignUp />} />
          <Route path={`/popular`} element={<PopularPage />} />
          <Route path={`/my-page`} element={<MyPage />}>
            <Route index element={<MyPageHome />} />
            <Route path={`reviews`} element={<MyReview />} />
            <Route path={`favorites`} element={<MyFavorite />} />
            <Route path={`profile`} element={<MyProfile />} />
          </Route>
          <Route path="/oauth/callback" element={<OAuthCallback />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
