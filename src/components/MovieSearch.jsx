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
    console.log(result);

    setSearchedList(result);
  }, [param]);

  return (
    <section>
      <div className="inner">
        {searchedList.length === 0 ? (
          <NoSearchValue param={param} />
        ) : (
          <ul className="grid gap-[10px] grid-cols-[repeat(8,1fr)] justify-start">
            {searchedList.map((el) => (
              <MovieCard key={el.id} {...el} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
