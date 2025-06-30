import { MovieCard } from "./MovieCard";

import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
    const totalImageCount =
      10 +
      popularList.length +
      playingMovieList.length +
      upComingMovieList.length +
      3;
    const [loadedCount, setLoadedCount] = useState(0);

    const handleCardImageLoad = () => {
      setLoadedCount((prev) => prev + 1);
    };

    const isAllLoaded = loadedCount >= totalImageCount;

    const topSlides = useMemo(
      () =>
        topMovieList.slice(0, 10).map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard
              {...el}
              isSwiper={true}
              onImageLoad={handleCardImageLoad}
            />
          </SwiperSlide>
        )),
      [topMovieList]
    );
    const popularSlides = useMemo(
      () =>
        popularList.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard {...el} onImageLoad={handleCardImageLoad} />
          </SwiperSlide>
        )),
      [popularList]
    );
    const playingSlides = useMemo(
      () =>
        playingMovieList.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard {...el} onImageLoad={handleCardImageLoad} />
          </SwiperSlide>
        )),
      [playingMovieList]
    );
    const upcomingSlides = useMemo(
      () =>
        upComingMovieList.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard {...el} onImageLoad={handleCardImageLoad} />
          </SwiperSlide>
        )),
      [upComingMovieList]
    );
    if (
      topMovieList.length === 0 ||
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
        {!isAllLoaded && (
          <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-60">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-white opacity-20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
            </div>
          </div>
        )}
        <section className="movie-top">
          <Swiper
            loop={true}
            centeredSlides={true}
            spaceBetween={20}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView="auto"
            navigation={true}
            pagination={{
              type: "fraction",
              renderFraction: function (currentClass, totalClass) {
                return `
                <span class="${currentClass}"></span>
                <span class="${totalClass}"></span>
                `;
              },
            }}
            // autoplay={{
            //   delay: 5000, // 슬라이드 간 시간 (ms)
            //   disableOnInteraction: false, // 사용자 터치 후에도 계속 자동재생
            // }}
          >
            {topSlides}
          </Swiper>
        </section>
        <section className="movie-popular mt-[5rem] max-[1024px]:mt-[3rem] max-[768px]:mt-[2rem]">
          <div className="inner relative">
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
                  slidesPerView: 3.5,
                },
                640: {
                  slidesPerView: 3.5,
                },
                768: {
                  slidesPerView: 6.5,
                },
                1024: {
                  slidesPerView: 9.5,
                },
                1279: {
                  slidesPerView: 6.2,
                },
                1920: {
                  slidesPerView: 11.5,
                },
              }}
            >
              {popularSlides}
            </Swiper>
            <Link
              to={`/popular`}
              className="more-btn absolute right-[3rem] top-0"
            >
              더보기
            </Link>
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
                  slidesPerView: 6.5,
                },
                1024: {
                  slidesPerView: 9.5,
                },
                1279: {
                  slidesPerView: 6.2,
                },
                1920: {
                  slidesPerView: 11.5,
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
                  slidesPerView: 6.5,
                },
                1024: {
                  slidesPerView: 9.5,
                },
                1279: {
                  slidesPerView: 6.2,
                },
                1920: {
                  slidesPerView: 11.5,
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
            <TrendingPeople
              trendingPeopleList={trendingPeopleList}
              onImageLoad={handleCardImageLoad}
            />
          </div>
        </section>
      </main>
    );
  }
);
