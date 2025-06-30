import { getRegExp } from "korean-regexp";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { NoSearchValue } from "./NoSearchValue";

export const MovieSearch = ({ popularList }) => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("query");
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    const reg = getRegExp(param);
    const result = popularList.filter((el) => el.title.match(reg));
    // console.log(result);

    setSearchedList(result);
  }, [param]);

  return (
    <section className="movie-search mt-[6rem] max-[1024px]:mt-[4rem] max-[768px]:mt-[3rem]">
      <div className="inner pr-[5vw]">
        {searchedList.length === 0 ? (
          <NoSearchValue param={param} />
        ) : (
          <ul className="movie-search__list">
            {searchedList.map((el) => (
              <MovieCard key={el.id} {...el} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
