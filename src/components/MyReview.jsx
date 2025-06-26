import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";
import myReviewData from "../data/myReviewData.json";
export const MyReview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const handleToDetail = (movieId) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(`/detail/${movieId}`);
  };
  return (
    <>
      <div className="flex">
        <div className="total-review">{myReviewData.total_reviews}</div>
        <div className="average-rating">{myReviewData.average_rating}</div>
        <div className="average-rating-count">
          {myReviewData.rating_distribution
            .sort((a, b) => b.id - a.id)
            .map((el, i) => (
              <div key={el.id} className="flex gap-[10px]">
                <span>{el.id}</span>
                <span>{el[`rating-${el.id}`]}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="h-[100%] overflow-y-scroll">
        {myReviewData.reviews.map((el) => (
          <div key={el.id} className="flex gap-[5rem]">
            <div className="movie-info__box flex">
              <div
                className="movie-poster"
                onClick={() => handleToDetail(el.id)}
              >
                {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>}
                <img
                  src={`${IMAGE_BASE_URL.poster}${el.poster_path}`}
                  alt={el.title}
                  onLoad={() => setIsLoaded(true)}
                  style={{ display: isLoaded ? "block" : "none" }}
                />
              </div>
              <div className="movie-info">
                <div>{el.title}</div>
                <div>{el.vote_average}</div>
                <div>{el.total_results}</div>
              </div>
            </div>
            <div className="my-review__info">
              <div className="rating">{el.rating}</div>
              <div className="date">{el.review_date}</div>
              <div className="review">{el.review_text}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
