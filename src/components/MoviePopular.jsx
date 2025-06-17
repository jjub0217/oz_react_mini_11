import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "./MovieCard";

export default function MoviePopular({ sortedList, IMAGE_BASE_URL }) {
  return (
    <div>
      <Swiper
        loop={true}
        centeredSlides={true}
        spaceBetween={20}
        modules={[Autoplay, Navigation]}
        slidesPerView="auto"
        // autoplay={{
        //   delay: 5000, // 슬라이드 간 시간 (ms)
        //   disableOnInteraction: false, // 사용자 터치 후에도 계속 자동재생
        // }}
      >
        {sortedList.slice(0, 20).map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCard
              key={el.id}
              IMAGE_BASE_URL={IMAGE_BASE_URL}
              {...el}
              isSwiper={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
