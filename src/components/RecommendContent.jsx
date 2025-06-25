import { API_URL } from "../constant/imageBaseUrl";
import useFetch from "../hooks/useFetch";
import { MovieCard } from "./MovieCard";

export const RecommendContent = ({ id }) => {
  console.log(id);

  const { data: recommendMovie } = useFetch(
    `${API_URL}/movie/${id}/recommendations?language=ko&page=1`
  );
  console.log(recommendMovie);
  const recommendList = recommendMovie?.results ?? [];

  return (
    <ul className="grid grid-cols-8 max-[1023px]:grid-cols-4 gap-[10px] mt-[2rem]">
      {recommendList.map((el) => (
        <MovieCard {...el} key={el.id} />
      ))}
    </ul>
  );
};
