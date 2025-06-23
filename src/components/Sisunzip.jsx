import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from "../constant/imageBaseUrl";
import useFetch from "../hooks/useFetch";
import { MovieCard } from "./MovieCard";

export const SisunZip = () => {
  const [searchParams] = useSearchParams();
  const personName = searchParams.get("query");

  const {
    data: movieCredits,
    isLoading,
    error,
  } = useFetch(
    `${API_URL}/search/person?query=${personName}&include_adult=false&language=ko&page=1`
  );

  const movieSlides = useMemo(() => {
    if (!movieCredits?.results?.[0]?.known_for?.length) return [];
    return movieCredits.results[0].known_for
      .filter((el) => el.media_type === "movie")
      .map((el) => (
        <SwiperSlide key={el.id}>
          <MovieCard {...el} />
        </SwiperSlide>
      ));
  }, [movieCredits]);

  const peopleData = useMemo(() => {
    if (!movieCredits?.results?.length) return [];
    return movieCredits.results;
  }, [movieCredits]);

  return (
    <section className="mt-[9rem] max-[1024px]:mt-[7rem] max-[768px]:mt-[6rem]">
      <div className="inner">
        <h2 className="font-medium text-[1.6rem] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem] mb-[20px] text-left">
          {peopleData[0]?.name} 팬이라면 무조건 봐야 할 영화
        </h2>

        <Swiper
          spaceBetween={15}
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          navigation={true}
          speed={600}
          slidesPerGroup={1}
          breakpoints={{
            320: {
              slidesPerView: 3.3,
            },
            640: {
              slidesPerView: 3.3,
            },
            768: {
              slidesPerView: 5.5,
            },
            1024: {
              slidesPerView: 6.5,
            },
            1280: {
              slidesPerView: 6.5,
            },
            1920: {
              slidesPerView: 8.5,
            },
          }}
        >
          {movieSlides}
        </Swiper>

        {/* <ul className="grid grid-cols-10 max-[768px]:grid-cols-4 gap-[10px] mt-[2rem]">
          {movieList.map((el) => (
            <MovieCard {...el} key={el.id} />
          ))}
        </ul> */}
      </div>
    </section>
  );
};
