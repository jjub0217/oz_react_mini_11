import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";
import FavoriteButton from "./FavoriteButton";

const CardContainer = styled(({ isSwiper, ...rest }) => <div {...rest} />)`
  cursor: pointer;
  .movie-poster {
    overflow: hidden;
    width: 100%;
    position: relative;
    padding-bottom: calc((360 / 240) * 100%);
    img {
      position: absolute;
      top: 0;
    }
  }
`;

export const MovieCard = memo((props) => {
  const {
    title,
    vote_average,
    backdrop_path,
    poster_path,
    release_date,
    id: movieId,
    isSwiper = false,
    pageType,
    onImageLoad,
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const handleToDetail = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(`/detail/${movieId}`);
  };

  return (
    <CardContainer onClick={handleToDetail} isSwiper={isSwiper}>
      <div className="movie-poster ">
        {/* {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>} */}
        <img
          src={
            isSwiper
              ? `${IMAGE_BASE_URL.backdrop}${backdrop_path}}`
              : `${IMAGE_BASE_URL.poster}${poster_path}`
          }
          alt={title}
          onLoad={() => {
            setIsLoaded(true);
            onImageLoad?.(); // ✅ Main에게 알림
          }}
          style={{
            visibility: isLoaded ? "visible" : "hidden",
            width: "100%",
            height: "100%",
          }}
          className="hover:scale-105 transition-transform"
        />
        {isSwiper ? null : (
          <FavoriteButton movieId={movieId} movieData={props} />
        )}
      </div>
      {isSwiper || pageType ? null : (
        <div className="flex flex-col gap-[15px] items-start pt-[15px] max-[768px]:hidden">
          <h2
            className={`${title} ? leading-none font-[500] text-[20px] text-left min-h-[20px]
            max-[1700px]:text-[18px] max-[1024px]:text-[1rem] max-[820px]:text-[16px] 
            max-[420px]:text-[16px] 
            max-[1700px]:h-[18px] max-[1024px]:h-[1rem] max-[820px]:h-[16px] max-[420px]:h-[16px]
          `}
          >
            {title}
          </h2>
          <p className="flex justify-between w-full leading-none text-[gray]">
            <span className="text-[18px] max-[1700px]:text-[16px] max-[820px]:text-[14px] max-[420px]:text-[14px]">
              {release_date ? release_date.slice(0, 4) : "개봉일 미정"}
            </span>
            <span className="movie-rating flex gap-[5px] text-[18px] max-[1700px]:text-[16px] max-[820px]:text-[14px] max-[420px]:text-[14px]">
              {Number(vote_average).toFixed(1)}
            </span>
          </p>
        </div>
      )}
    </CardContainer>
  );
});
