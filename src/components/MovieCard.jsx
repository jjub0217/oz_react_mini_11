import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";

const CardContainer = styled(({ isSwiper, viewportWidth, ...rest }) => (
  <div {...rest} />
))`
  cursor: pointer;
  .image_box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: ${(props) => (props.isSwiper ? "" : "23vh")};
    border-radius: 5px;

    min-width: ${({ isSwiper, viewportWidth }) =>
      isSwiper ? `${viewportWidth * (900 / 1719)}px` : "auto"};
    padding-bottom: ${({ isSwiper, viewportWidth }) =>
      isSwiper ? `${viewportWidth * (195 / 900)}px` : "0"};

    img {
      position: ${(props) => (props.isSwiper ? "absolute" : "")};
      top: ${(props) => (props.isSwiper ? "0" : "")};
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const MovieCard = memo((props) => {
  const {
    title,
    vote_average,
    backdrop_path,
    poster_path,
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
      <div className="image_box">
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
          <h2 className="leading-none font-[500] text-[#fff] text-[13px]">
            {title}
          </h2>
          <p className="leading-none text-[11px] text-[gray]">
            평점: {vote_average}
          </p>
        </div>
      )}
    </CardContainer>
  );
});
