import { useCallback, useEffect, useState } from "react";

const useFetch = (initialUrl = null) => {
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

  const getData = useCallback(async (customUrl) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch(customUrl, options);
      if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
      const json = await res.json();
      return json;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []); // 🔒 빈 배열로 고정
  // const getData = useCallback(async (customUrl) => {
  //   setIsLoading(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     const res = await fetch(customUrl, options);
  //     if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
  //     const json = await res.json();
  //     return json; //  외부에서 가공 가능해야 하기 때문에
  //   } catch (err) {
  //     setError(err);
  //     return null;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    if (!initialUrl) return;
    getData(initialUrl).then((res) => {
      if (res) setData(res);
    });
  }, [initialUrl, getData]);

  return { isLoading, data, error, getData };
};

export default useFetch;
