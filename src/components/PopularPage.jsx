import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { API_URL } from "../constant/imageBaseUrl";
import useFetch from "../hooks/useFetch";
import { useThrottle } from "../hooks/useThrottle";
import { MovieCard } from "./MovieCard";

export const PopularPage = () => {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);

  // 더 불러올 수 있는 영화가 있는지 여부
  const [hasMore, setHasMore] = useState(true);

  // 이건 실제로 <div ref={ref}> 요소가 화면 하단에 보일 때 작동
  // inView: 해당 요소가 뷰포트에 노출되면 true, 아니면 false
  // inView가 true일 때 → 스크롤이 바닥에 도달했을 때
  // threshold: 1 은 ref 요소가 뷰포트에 100% 다 보여야 inView가 true가 됩니다.
  // → 요소가 완전히 보여야 inView가 true
  // 이 조건은 실제 사용자에게는 스크롤을 거의 바닥까지 내렸을 때만 작동합니다.

  // threshold: 0.3 로 조금 줄임
  const { ref, inView } = useInView({ threshold: 0.3 });

  const { getData, isLoading } = useFetch("");

  const fetchNext = async () => {
    const nextUrl = `${API_URL}/movie/popular?language=ko&page=${page}`;
    const res = await getData(nextUrl);

    if (!res?.results || res.results.length === 0) {
      setHasMore(false);
      return;
    }

    const filtered = res.results.filter((movie) => !movie.adult);
    setMovieList((prev) => [...prev, ...filtered]);
    setPage((prev) => prev + 1);
  };

  // console.log(movieList);

  const throttled = useThrottle(fetchNext, 300);

  useEffect(() => {
    fetchNext(); // 첫 페이지 로드
  }, []);

  useEffect(() => {
    // inView가 true일 때 → 스크롤이 바닥에 도달했을 때
    // hasMore가 true일 때 → 더 불러올 데이터가 있을 때
    // isLoading이 false일 때 → 중복 요청 방지
    if (inView && hasMore && !isLoading) {
      throttled(); // Throttle 적용된 함수 호출
    }
  }, [inView, hasMore, isLoading, throttled]);

  return (
    <main className="inner pr-[5vw] mt-[6rem] max-[1024px]:mt-[7rem] max-[768px]:mt-[6rem]">
      <h2 className="font-medium text-[1.6rem] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem] mb-[20px] text-left">
        요즘 뜨는 영화
      </h2>
      <section className="grid  movie-popular-infinite">
        {movieList.map((movie) => (
          <div key={movie.id}>
            <MovieCard {...movie} pageType={"popular"} />
          </div>
        ))}
        <div ref={ref} className="h-[1px]" />
      </section>
    </main>
  );
};
