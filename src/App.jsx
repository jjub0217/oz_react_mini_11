import { lazy, Suspense, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import { Main } from "./components/Main";
import { API_URL } from "./constant/imageBaseUrl";
import { useAuth } from "./hooks/useAuth";
import useFetch from "./hooks/useFetch";

const Login = lazy(() =>
  import("./components/Login").then((m) => ({ default: m.Login }))
);
const SignUp = lazy(() =>
  import("./components/SignUp").then((m) => ({ default: m.SignUp }))
);
const MovieDetail = lazy(() =>
  import("./components/MovieDetail").then((m) => ({ default: m.MovieDetail }))
);
const MovieSearch = lazy(() =>
  import("./components/MovieSearch").then((m) => ({ default: m.MovieSearch }))
);
const MyPage = lazy(() =>
  import("./components/MyPage").then((m) => ({ default: m.MyPage }))
);
const MyPageHome = lazy(() =>
  import("./components/MyPageHome").then((m) => ({ default: m.MyPageHome }))
);
const MyProfile = lazy(() =>
  import("./components/MyProfile").then((m) => ({ default: m.MyProfile }))
);
const MyReview = lazy(() =>
  import("./components/MyReview").then((m) => ({ default: m.MyReview }))
);
const MyFavorite = lazy(() => import("./components/MyFavorite"));
const OAuthCallback = lazy(() => import("./components/OAuthCallback"));
const PopularPage = lazy(() =>
  import("./components/PopularPage").then((m) => ({ default: m.PopularPage }))
);
const SisunZip = lazy(() =>
  import("./components/Sisunzip").then((m) => ({ default: m.SisunZip }))
);

function App() {
  const { getUserInfo } = useAuth();

  useEffect(() => {
    // 앱 시작 시 LocalStorage에 저장된 유저 정보 → 전역 상태로 저장
    getUserInfo();
  }, []);

  const { data: popularData } = useFetch(
    `${API_URL}/movie/popular?language=ko&page=1`
  );
  const { data: topData } = useFetch(
    `${API_URL}/trending/movie/day?language=en-US&page=1`
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

  const topMovieList = useMemo(
    () => topData?.results?.filter((el) => !el.adult) ?? [],
    [topData]
  );

  const popularList = useMemo(
    () => popularData?.results?.filter((el) => !el.adult) ?? [],
    [popularData]
  );

  const playingMovieList = useMemo(
    () => playingList?.results?.filter((el) => !el.adult) ?? [],
    [playingList]
  );

  const upComingMovieList = useMemo(
    () => upComingList?.results?.filter((el) => !el.adult) ?? [],
    [upComingList]
  );

  const trendingPeopleList = useMemo(() => {
    if (!trendingData?.results) return [];
    return trendingData.results.filter(
      (el) =>
        !el.adult &&
        el.known_for_department !== null &&
        el.known_for.length !== 0 &&
        el.profile_path
    );
  }, [trendingData]);

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
}

export default App;
