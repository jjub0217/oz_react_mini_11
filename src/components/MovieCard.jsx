import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";

const CardContainer = styled(({ isSwiper, viewportWidth, ...rest }) => (
  <div {...rest} />
))`
  cursor: pointer;
  width: ${({ isSwiper, viewportWidth }) =>
    isSwiper ? `${viewportWidth * (195 / 900)}px` : "10vw"};
  @media (max-width: 768px) {
    width: ${({ isSwiper }) => (isSwiper ? "160px" : "40vw")};
  }
  .movie-poster {
    overflow: hidden;
    width: 100%;
    width: ${(isSwiper) => (isSwiper ? "auto" : "20vw")};

    min-width: ${({ isSwiper, viewportWidth }) =>
      isSwiper ? `${viewportWidth * (900 / 1719)}px` : ""};

    img {
      position: ${(props) => (props.isSwiper ? "absolute" : "")};
      top: ${(props) => (props.isSwiper ? "0" : "")};
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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CardContainer
      onClick={handleToDetail}
      isSwiper={isSwiper}
      viewportWidth={viewportWidth}
    >
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
        <div className="flex flex-col gap-[10px] items-start py-[15px]">
          <h2 className="leading-none font-[500] text-[#fff] text-[13px] text-left">
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
