import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_V4_TOKEN}`,
    },
  };

  const getData = async () => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) getData();
  }, [url]);
  return { isLoading, data, error };
};
export default useFetch;
