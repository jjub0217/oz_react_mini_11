import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "./MovieCard";

export function MoviePopular({ popularList }) {
  return (
    <Swiper
      loop={true}
      centeredSlides={true}
      spaceBetween={10}
      modules={[Autoplay, Navigation, Pagination]}
      slidesPerView="auto"
      navigation={true}
      pagination={{ type: "fraction" }}
      // autoplay={{
      //   delay: 5000, // 슬라이드 간 시간 (ms)
      //   disableOnInteraction: false, // 사용자 터치 후에도 계속 자동재생
      // }}
    >
      {popularList.slice(0, 10).map((el) => (
        <SwiperSlide key={el.id}>
          <MovieCard key={el.id} {...el} isSwiper={true} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
