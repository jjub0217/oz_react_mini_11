const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constant/imageBaseUrl";
import useFetchGenres from "../hooks/useFetchGenres";
import { SkeletonDetail } from "./SkeletonDetail";

export const MovieDetail = ({ popularList }) => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [matchedGenres, setMatchedGenres] = useState([]);

  const { results: genreList, isLoading: genreLoading } = useFetchGenres(
    `${API_URL}/genre/movie/list?language=ko`
  );

  useEffect(() => {
    if (popularList.length == 0 || genreList.length === 0) return;
    const detailMovie = popularList.find((el) => el.id === Number(id));
    setDetail(detailMovie);

    if (detailMovie) {
      const matchedGenre = genreList.filter((genre) =>
        detailMovie.genre_ids.includes(genre.id)
      );
      setMatchedGenres(matchedGenre);
    }
  }, [id, popularList, genreList]);

  if (!detail || genreLoading) {
    return <SkeletonDetail />;
  }

  return (
    <section className="max-w-screen-lg h-[calc(100vh-60px)] justify-center text-[#fff]">
      <div className="flex gap-[20px] w-[100%]">
        <div className="pb-[calc((185/350)*100%)] w-[350px] relative">
          {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>}
          <img
            src={`${IMAGE_BASE_URL}${detail.poster_path}`}
            alt={detail.title}
            onLoad={() => setIsLoaded(true)}
            style={{ display: isLoaded ? "block" : "none" }}
            className="object-cover absolute top-0 w-[100%] h-[100%]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <h2 className="leading-none font-[500] text-[16px]">
              {detail.title}
            </h2>
            <p className="leading-none text-[13px] text-[gray]">
              평점: {detail.vote_average}
            </p>
          </div>
          <div className="flex gap-[5px]">
            {matchedGenres.map((el) => (
              <span key={el.id} className="text-[13px]">
                {el.name}
              </span>
            ))}
          </div>
          <p className="text-[13px] text-left">{detail.overview}</p>
        </div>
      </div>
    </section>
  );
};
