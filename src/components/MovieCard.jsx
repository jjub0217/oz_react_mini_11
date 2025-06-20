import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";

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
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const handleToDetail = () => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <CardContainer onClick={handleToDetail} isSwiper={isSwiper}>
      <div className="movie-poster">
        {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>}
        <img
          src={
            isSwiper
              ? `${IMAGE_BASE_URL}${backdrop_path}}`
              : `${IMAGE_BASE_URL}${poster_path}`
          }
          alt={title}
          onLoad={() => setIsLoaded(true)}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      </div>
      {isSwiper ? null : (
        <div className="flex flex-col gap-[10px] items-start pt-[15px]">
          <h2 className="leading-none font-[500] text-[13px] text-left">
            {title}
          </h2>
          <p className="flex justify-between w-full leading-none text-[11px] text-[gray]">
            <span>{release_date.slice(0, 4)}</span>
            <span className="movie-rating flex gap-[5px]">
              {Number(vote_average).toFixed(1)}
            </span>
          </p>
        </div>
      )}
    </CardContainer>
  );
});
