import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

export const MyPageHome = () => {
  const { user } = useSupabaseAuth(); // 로그인한 사용자 정보
  const { reviewData, favoriteList } = useOutletContext();
  const { reviews, average_rating, total_reviews } = reviewData;

  const handleToDetail = (movieId) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(`/detail/${movieId}`);
  };

  const totalImageCount =
    Math.min(reviews.length, 2) + Math.min(favoriteList.length, 5);

  const [loadedCount, setLoadedCount] = useState(0);

  const onImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const isAllLoaded = loadedCount >= totalImageCount;

  return (
    <div className="my-page flex flex-col gap-[3rem] h-full">
      {!isAllLoaded ? (
        <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-black bg-opacity-60">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-white opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
          </div>
        </div>
      ) : null}
      <h2 className="text-[1.5rem]">
        👋 안녕하세요,
        <span className="text-purple-400">
          {user?.identities[0]?.identity_data.name || "사용자"}님
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="dashboard bg-[#333] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <p className="text-xl font-semibold max-[1700px]:text-[1rem]">
            작성한 리뷰
          </p>
          <p className="text-2xl mt-2 font-semibold max-[1700px]:text-[1.3rem]">
            {total_reviews}개
          </p>
        </div>
        <div className="dashboard bg-[#333] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <p className="text-xl font-semibold max-[1700px]:text-[1rem]">
            관심 영화
          </p>
          <p className="text-2xl mt-2 max-[1700px]:text-[1.3rem]">{"20"}편</p>
        </div>
        <div className="dashboard bg-[#333] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <p className="text-xl font-semibold max-[1700px]:text-[1rem]">
            평균 평점
          </p>
          <p className=" mt-2 flex items-center gap-[1rem]">
            <span className="star">★</span>
            <span className="text-2xl max-[1700px]:text-[1.3rem]">
              {average_rating.toFixed(1)}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[3rem] flex-1 max-[768px]:grid-cols-1">
        <section>
          <h3 className="text-xl font-bold mb-[2rem] max-[1700px]:text-[1rem]">
            📝 최근 작성한 리뷰
          </h3>
          <ul className="flex flex-col gap-4">
            {reviews.slice(0, 2).map((review, i) => {
              const myRating = (review.rating / 5) * 100;
              return (
                <li
                  key={review.id}
                  className="dashboard__review shadow-lg  bg-[#333]  rounded-xl flex items-start"
                >
                  <div
                    className="movie-poster"
                    onClick={() => handleToDetail(review.id)}
                  >
                    {/* {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>} */}
                    <img
                      src={`${IMAGE_BASE_URL.poster}${review.poster_path}`}
                      alt={review.title}
                      onLoad={onImageLoad}
                      style={{
                        visibility: isAllLoaded ? "visible" : "hidden",
                        // width: "100%",
                        // height: "auto",
                      }}
                      // style={{ display: isLoaded ? "block" : "none" }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-start gap-[1rem]">
                    <strong>{review.title}</strong>
                    <div className="flex gap-[0.2rem] items-center">
                      <span>평점</span>
                      <div className="my-star star-rating">
                        <span className="star-back">★★★★★</span>
                        <div
                          className="star star-front"
                          style={{ width: `${myRating}%` }}
                        >
                          ★★★★★
                        </div>
                      </div>
                    </div>

                    <p className="text-left multi-line-ellipsis">
                      {review.review_text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-[2rem] max-[1700px]:text-[1rem]">
            ❤️ 최근 관심 등록한 영화
          </h3>
          <div>
            {favoriteList.length === 0 ? (
              <div className="no-favorite text-center border border-dashed rounded-xl p-6 mt-10">
                <p className="text-[1.5rem] mb-2 max-[786px]:text-[1rem]">
                  💔 찜한 영화가 없어요
                </p>
                <p className="text-[1rem] opacity-70 max-[786px]:text-[0.9rem]">
                  마음에 드는 영화를 찾아 찜해보세요!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4 dashboard-favorite">
                {favoriteList.slice(0, 8).map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-poster rounded-xl overflow-hidden"
                    onClick={() => handleToDetail(movie.id)}
                  >
                    {/* {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>} */}
                    <img
                      src={`${IMAGE_BASE_URL.poster}${movie.poster_path}`}
                      alt={movie.title}
                      onLoad={onImageLoad}
                      // style={{ display: isLoaded ? "block" : "none" }}
                      style={{
                        visibility: isAllLoaded ? "visible" : "hidden",
                        // width: "100%",
                        // height: "auto",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
