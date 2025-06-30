import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";

export const MyReview = () => {
  // const { getReviews, updateReview, deleteReview } = useSupabaseReview();
  // const [reviewData, setReviewData] = useState(null);

  // const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { reviewData } = useOutletContext();

  const handleToDetail = (movieId) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(`/detail/${movieId}`);
  };

  // console.log(reviewData);

  const totalImageCount = reviewData.reviews.length;

  const [loadedCount, setLoadedCount] = useState(0);

  const onImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const isAllLoaded = loadedCount >= totalImageCount;
  // useEffect(() => {
  //   const fetch = async () => {
  //     const data = await getReviews();
  //     if (data) setReviewData(data);
  //   };
  //   fetch();
  // }, [getReviews]);

  // if (!reviewData) return <p>로딩 중...</p>;
  // console.log(reviewData);

  const percentage = (reviewData.average_rating / 5) * 100;

  return (
    <div className="my-review h-full overflow-hidden">
      {!isAllLoaded && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-60">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-white opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}
      <h2 className="text-left mb-[2rem] text-[2rem] max-[1700px]:text-[1.7rem] max-[1700px]:mb-[1rem]">
        My Reviews
      </h2>
      <div className="border-bottom flex justify-between items-center pb-[1.3rem] border-b-[1px]">
        <div
          className="total-review flex flex-col"
          style={{ width: "calc(100% / 3)" }}
        >
          <h3 className="text-[1.3rem] max-[1700px]:text-[1.2rem]">
            Total Reviews
          </h3>
          <span className="text-[2.2rem] max-[1700px]:text-[1.7rem]">
            {reviewData.total_reviews.toLocaleString()}
          </span>
        </div>
        <div
          className="w-[1.2px] self-stretch divider"
          // style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        />
        <div
          className="average-rating flex flex-col items-center"
          style={{ width: "calc(100% / 3)" }}
        >
          <h3 className="text-[1.3rem] max-[1700px]:text-[1.2rem]">
            Average Rating
          </h3>

          <div className="flex items-center gap-[1rem]">
            <span className="text-[2.2rem] max-[1700px]:text-[1.7rem]">
              {reviewData.average_rating.toFixed(1)}
            </span>
            <div className="star-rating">
              <div className="star-back">★★★★★</div>
              <div
                className="star star-front"
                style={{ width: `${percentage}%` }}
              >
                ★★★★★
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-[1.2px] self-stretch divider"
          // style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        />
        <div
          className="average-rating-count flex flex-col items-center"
          style={{ width: "calc(100% / 3)" }}
        >
          {reviewData.rating_distribution
            .sort((a, b) => b.id - a.id)
            .map((el, i) => {
              const count = el[`rating-${el.id}`];
              const max = Math.max(
                ...reviewData.rating_distribution.map(
                  (e) => e[`rating-${e.id}`]
                )
              ); // 최대값 기준
              const widthPercent = (count / max) * 100;

              return (
                <div key={el.id} className="flex gap-[10px] items-center">
                  <div className="star">★</div>
                  <span className="movie-rating">{el.id}</span>

                  <div className="relative h-[6px] w-[120px] bg-transparent rounded">
                    <div
                      className="absolute top-0 left-0 h-full rounded"
                      style={{
                        width: `${widthPercent}%`,
                        backgroundColor:
                          el.id === 5
                            ? "#10b981" // emerald
                            : el.id === 4
                            ? "#d946ef" // fuchsia
                            : el.id === 3
                            ? "#f59e0b" // amber
                            : el.id === 2
                            ? "#3b82f6" // blue
                            : "#ea580c", // orange
                      }}
                    />
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="h-[100%] pb-[10rem] overflow-y-scroll pt-[2.5rem] flex flex-col">
        {reviewData.reviews.map((el) => {
          const myRating = (el.rating / 5) * 100;
          return (
            <div key={el.id} className="flex gap-[5rem]">
              <div className="movie-info__box flex gap-[1.5rem]">
                <div
                  className="movie-poster"
                  onClick={() => handleToDetail(el.id)}
                >
                  {/* {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>} */}
                  <img
                    src={`${IMAGE_BASE_URL.poster}${el.poster_path}`}
                    alt={el.title}
                    onLoad={onImageLoad}
                    style={{
                      visibility: isAllLoaded ? "visible" : "hidden",
                      // width: "100%",
                      // height: "auto",
                    }}
                    // style={{ display: isLoaded ? "block" : "none" }}
                  />
                </div>
                <div className="movie-info flex flex-col items-start gap-[0.2rem]">
                  <div className=" text-[1.3rem]">{el.title}</div>
                  <div className="flex gap-[10px]">
                    <span>Total rating average</span>
                    <span className=" font-semibold">
                      {el.vote_average.toFixed(1)}
                    </span>{" "}
                  </div>
                  <div className="flex gap-[10px]">
                    <span>Total reviews</span>
                    <span className=" font-semibold">
                      {el.total_results.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-review__info flex flex-col items-start gap-[1.5rem]">
                <div className="flex items-center gap-[1rem]">
                  <div className="my-star star-rating">
                    <div className="star-back">★★★★★</div>
                    <div
                      className="star star-front"
                      style={{ width: `${myRating}%` }}
                    >
                      ★★★★★
                    </div>
                  </div>
                  <div className="date">{el.review_date}</div>
                </div>
                <div className="review text-left">
                  {el.review_text.split("\n").map((line, i) => (
                    <p key={i}>
                      <span>{line}</span>
                      <br />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
