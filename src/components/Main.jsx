import { MovieCard } from "./MovieCard";

import { memo, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TrendingPeople } from "./TrendingPeople";

export const Main = memo(
  ({
    popularList,
    topMovieList,
    playingMovieList,
    upComingMovieList,
    trendingPeopleList,
  }) => {
    const topSlides = useMemo(
      () =>
        topMovieList.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard {...el} isSwiper={true} />
          </SwiperSlide>
        )),
      [topMovieList]
    );
    const popularSlides = useMemo(
      () =>
        popularList.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard {...el} />
          </SwiperSlide>
        )),
      [popularList]
    );
    const playingSlides = useMemo(
      () =>
        playingMovieList.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard {...el} />
          </SwiperSlide>
        )),
      [playingMovieList]
    );
    const upcomingSlides = useMemo(
      () =>
        upComingMovieList.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard {...el} />
          </SwiperSlide>
        )),
      [upComingMovieList]
    );
    if (
      popularList.length === 0 ||
      playingMovieList.length === 0 ||
      upComingMovieList.length === 0 ||
      trendingPeopleList.length === 0
    ) {
      return (
        <p className="text-center py-20">영화 데이터를 불러오는 중입니다...</p>
      );
    }
    return (
      <main className="pb-[50px]">
        <section className="movie-top">
          <Swiper
            loop={true}
            centeredSlides={true}
            spaceBetween={20}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView="auto"
            navigation={true}
            pagination={{ type: "fraction" }}

            // autoplay={{
            //   delay: 5000, // 슬라이드 간 시간 (ms)
            //   disableOnInteraction: false, // 사용자 터치 후에도 계속 자동재생
            // }}
          >
            {topSlides}
          </Swiper>
        </section>
        <section className="movie-popular mt-[5rem] max-[1024px]:mt-[3rem] max-[768px]:mt-[2rem]">
          <div className="inner">
            <h2 className="font-medium text-[1.6rem] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem] mb-[20px] text-left">
              요즘 뜨는 영화
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
              {popularSlides}
            </Swiper>
          </div>
        </section>
        <section className="movie-now mt-[5rem] max-[1024px]:mt-[3rem] max-[768px]:mt-[2rem]">
          <div className="inner">
            <h2 className="font-medium text-[1.6rem] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem] mb-[10px] text-left">
              현재 상영중인 영화
            </h2>
            <Swiper
              spaceBetween={15}
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1}
              navigation={true}
              breakpoints={{
                320: {
                  slidesPerView: 3.5,
                },
                640: {
                  slidesPerView: 3.5,
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
              {playingSlides}
            </Swiper>
          </div>
        </section>
        <section className="movie-coming mt-[5rem] max-[1024px]:mt-[3rem] max-[768px]:mt-[2rem]">
          <div className="inner">
            <h2 className="font-medium text-[1.6rem] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem] mb-[10px] text-left">
              개봉 예정중인 영화
            </h2>
            <Swiper
              spaceBetween={15}
              modules={[Autoplay, Navigation, Pagination]}
              slidesPerView={1}
              navigation={true}
              breakpoints={{
                320: {
                  slidesPerView: 3.5,
                },
                640: {
                  slidesPerView: 3.5,
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
              {upcomingSlides}
            </Swiper>
          </div>
        </section>
        <section className="trending-people mt-[5rem] max-[1024px]:mt-[3rem] max-[768px]:mt-[2rem]">
          <div className="inner">
            <h2 className="font-medium text-[1.6rem] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem] mb-[10px] text-left">
              OZ 시선집
            </h2>
            <TrendingPeople trendingPeopleList={trendingPeopleList} />
          </div>
        </section>
      </main>
    );
  }
);
