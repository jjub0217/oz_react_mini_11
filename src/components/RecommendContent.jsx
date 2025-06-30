import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from "../constant/imageBaseUrl";
import useFetch from "../hooks/useFetch";
import { getGenreDescription } from "../utils/getGenreDescription";
import { MovieCard } from "./MovieCard";

export const RecommendContent = ({ id, genres }) => {
  // console.log(genres); // [{id: 27, name: '공포'},{id: 53, name: '스릴러'},{id: 878, name: 'SF'}]
  const { getData } = useFetch();
  const [genreList, setGenreList] = useState([]);
  const [genreMovie, setGenreMovie] = useState({});
  const [actorMovie, setActorMovie] = useState({});

  useEffect(() => {
    // ✅ 1. 장르별 인기 영화 리스트
    const fetchGenres = async () => {
      const result = await Promise.all(
        genres.map(async (genre) => {
          const url = `${API_URL}/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&language=ko&page=1`;
          const json = await getData(url);
          const filtered = (json?.results ?? []).filter(
            (movie) => !!movie.poster_path
          );
          return { genreName: genre.name, movies: filtered ?? [] };
        })
      );

      // genreMap: { [장르 이름]: 영화 리스트 }
      const genreMap = {};
      result.forEach(({ genreName, movies }) => {
        genreMap[genreName] = movies;
      });
      setGenreMovie(genreMap);
    };
    if (id && genres.length > 0) fetchGenres();
  }, [id, genres, getData]);

  // ✅ 2. 배우별 출연 영화 데이터 요청
  useEffect(() => {
    const fetchActors = async () => {
      const creditUrl = `${API_URL}/movie/${id}/credits?language=ko`;
      const creditJson = await getData(creditUrl);
      const top2 = creditJson?.cast?.slice(0, 2) ?? [];

      const result = await Promise.all(
        top2.map(async (actor) => {
          const url = `${API_URL}/person/${actor.id}/movie_credits?language=ko`;
          const json = await getData(url);
          const filtered = (json?.cast ?? []).filter(
            (movie) => !!movie.poster_path
          );
          return {
            actorName: actor.name,
            movies: filtered ?? [],
          };
        })
      );

      const map = {};
      result.forEach(({ actorName, movies }) => {
        map[actorName] = movies;
      });
      setActorMovie(map);
    };

    if (id) fetchActors();
  }, [id, getData]);

  useEffect(() => {
    const fetchGenreList = async () => {
      const genreUrl = `${API_URL}/genre/movie/list?language=ko`;
      const data = await getData(genreUrl);
      setGenreList(data?.genres ?? []);
    };

    fetchGenreList();
  }, []);

  // console.log(actorMovie);

  return (
    <>
      {genres.map((genre) => {
        const movies = genreMovie[genre.name];
        if (!Array.isArray(movies) || movies.length === 0) return null;

        return (
          <section
            key={genre.name}
            className="pt-[2rem] mb-[3rem] max-[768px]:mb-[1rem]"
          >
            <h3 className="text-[1.5rem] mb-[1.3rem] max-[768px]:text-[1rem] ">
              {getGenreDescription(genre.id, genreList)}
            </h3>
            <Swiper
              spaceBetween={15}
              navigation
              modules={[Navigation]}
              breakpoints={{
                320: {
                  slidesPerView: 3.5,
                },
                640: {
                  slidesPerView: 3.5,
                },
                768: {
                  slidesPerView: 6.5,
                },
                1279: {
                  slidesPerView: 5.2,
                },
                1920: {
                  slidesPerView: 11.5,
                },
              }}
            >
              {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard {...movie} pageType="recommend" />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        );
      })}

      {/* ✅ 배우별 Swiper */}
      {Object.entries(actorMovie).map(([actorName, movies]) => {
        if (!Array.isArray(movies) || movies.length === 0) return null;

        return (
          <section
            key={actorName}
            className="pt-[2rem] mb-[3rem] max-[768px]:mb-[1rem]"
          >
            <h3 className="text-[1.5rem] mb-[1.3rem] max-[768px]:text-[1rem] ">
              {actorName}의 팬이라면 무조건 봐야 할 영화
            </h3>
            <Swiper
              spaceBetween={15}
              navigation
              modules={[Navigation]}
              breakpoints={{
                320: {
                  slidesPerView: 3.5,
                },
                640: {
                  slidesPerView: 3.5,
                },
                768: {
                  slidesPerView: 6.5,
                },
                1024: {
                  slidesPerView: 5.5,
                },
                1920: {
                  slidesPerView: 11.5,
                },
              }}
            >
              {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard {...movie} pageType="recommend" />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        );
      })}
    </>
  );
};
