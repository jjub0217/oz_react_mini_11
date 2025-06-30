import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTabs } from "../constant/getTabs";
import { API_URL, IMAGE_BASE_URL } from "../constant/imageBaseUrl";
import useFetch from "../hooks/useFetch";
import { CommentContent } from "./CommentContent";
import FavoriteButton from "./FavoriteButton";
import { RecommendContent } from "./RecommendContent";
import { SkeletonDetail } from "./SkeletonDetail";
import { Tabs } from "./Tabs";

export const MovieDetail = () => {
  const { id } = useParams();
  const { data: movieDetail } = useFetch(`${API_URL}/movie/${id}?language=ko`);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("comments");
  const [loadedCount, setLoadedCount] = useState(0);
  const { data: detailInfo } = useFetch(
    `${API_URL}/movie/${id}/reviews?language=en-US&page=1`
  );
  // console.log(movieDetail);

  const commentList = detailInfo?.results ?? [];
  const commentCount = detailInfo?.results?.length ?? 0;
  const tabs = getTabs(commentCount);

  if (!movieDetail) {
    return <SkeletonDetail />;
  }

  const totalImageCount = 2;

  const onImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const isAllLoaded = loadedCount >= totalImageCount;

  return (
    <div className="mt-[2rem] relative">
      {!isAllLoaded && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-60">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-white opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}
      <section className="movie-detail h-[40rem]">
        <div className="inner h-full">
          <div className="movie-detail__visual-box h-full">
            <div className="movie-detail__poster-box">
              <div className="movie-poster">
                <img
                  src={`${IMAGE_BASE_URL.poster}${movieDetail.poster_path}`}
                  alt={movieDetail.title}
                  onLoad={onImageLoad}
                  style={{
                    visibility: isAllLoaded ? "visible" : "hidden",
                  }}
                />
                <FavoriteButton movieId={id} movieData={movieDetail} />
              </div>

              <div className="movie-detail__info">
                <div className="movie-detail__title-box">
                  <h2 className="movie-title">{movieDetail.title}</h2>
                  <span className="movie-rating">
                    <span className="star">★</span>
                    <span>{Number(movieDetail.vote_average).toFixed(1)}</span>
                  </span>
                </div>
                <div className="movie-detail__meta">
                  <span className="movie-release">
                    {movieDetail.release_date.slice(0, 4)}
                  </span>
                  <span className="movie-detail__runtime">
                    {movieDetail.runtime}분
                  </span>
                  <div className="movie-detail__genres">
                    {movieDetail.genres.map((el) => (
                      <span key={el.id} className="movie-detail__genre">
                        {el.name}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="movie-detail__overview">{movieDetail.overview}</p>
              </div>
            </div>

            <div className="movie-poster__backdrop h-full">
              {/* {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>} */}
              <img
                src={`${IMAGE_BASE_URL.backdrop}${movieDetail.backdrop_path}`}
                alt={movieDetail.title}
                onLoad={onImageLoad}
                style={{
                  visibility: isAllLoaded ? "visible" : "hidden",
                  // width: "100%",
                  // height: "auto",
                }}
                className="h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="movie-tab__info pb-[80px] mt-[6.5rem] max-[768px]:px-[5vw] ">
        <div className="inner text-left w-full ">
          <Tabs setActiveTab={setActiveTab} tabs={tabs} id={id} />
          <div className="movie-tabs-content">
            <div
              style={{ display: activeTab === "comments" ? "block" : "none" }}
              className="pr-[5vw]"
            >
              <CommentContent
                detailInfo={commentList}
                commentCount={commentCount}
              />
            </div>
            <div
              style={{ display: activeTab === "recommend" ? "block" : "none" }}
            >
              <RecommendContent id={id} genres={movieDetail.genres} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
