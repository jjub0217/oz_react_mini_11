import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, IMAGE_BASE_URL } from "../constant/imageBaseUrl";
import useFetch from "../hooks/useFetch";
import { SkeletonDetail } from "./SkeletonDetail";

export const MovieDetail = () => {
  const { id } = useParams();
  const { data: movieDetail } = useFetch(`${API_URL}/movie/${id}?language=ko`);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [activeTab, setActiveTab] = useState("comments");

  // const { data: detailInfo } = useFetch(
  //   `${API_URL}/movie/${id}/reviews?language=en-US&page=1`
  // );

  // const commentCount = detailInfo?.results?.length ?? 0;
  // const tabs = getTabs(commentCount);

  if (!movieDetail) {
    return <SkeletonDetail />;
  }

  return (
    <>
      <section className="movie-detail">
        <div className="inner">
          <div className="movie-poster">
            {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>}
            <img
              src={`${IMAGE_BASE_URL}${movieDetail.backdrop_path}`}
              alt={movieDetail.title}
              onLoad={() => setIsLoaded(true)}
              style={{ display: isLoaded ? "block" : "none" }}
            />
          </div>
          <div className="movie-detail__info">
            <div className="movie-detail__title-box">
              <h2 className="movie-title">{movieDetail.title}</h2>
              <span className="movie-rating">
                {Number(movieDetail.vote_average).toFixed(1)}
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
      </section>
      {/* <section className="movie-tab__info">
        <div className="inner text-left w-full"> */}
      {/* <MovieDetailTabs setActiveTab={setActiveTab} tabs={tabs} /> */}
      {/* {activeTab === "comments" ? (
            <CommentContent
              detailInfo={detailInfo?.results}
              commentCount={commentCount}
            />
          ) : activeTab === "recommend" ? (
            <RecommendContent />
          ) : null} */}
      {/* </div>
      </section> */}
    </>
  );
};
