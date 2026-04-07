import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getMyTabs } from "../constant/getTabs";
import { useSupabase } from "../context/SupabaseContext";
import { useSupabaseFavorite } from "../hooks/useSupabaseFavorite";
import { useSupabaseReview } from "../hooks/useSupabaseReview";
import { Tabs } from "./Tabs";

export const MyPage = () => {
  const tabs = getMyTabs();

  const { getReviews } = useSupabaseReview();
  const { user, setFavoriteList: setGlobalFavoriteList } = useSupabase();
  const { fetchFavorites } = useSupabaseFavorite();
  const [favoriteList, setFavoriteList] = useState([]);
  const [reviewData, setReviewData] = useState(null);
  const [setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const [reviewResult, favorites] = await Promise.all([
        getReviews(),
        fetchFavorites(user.id),
      ]);

      if (reviewResult) setReviewData(reviewResult);
      setFavoriteList(favorites);
      setGlobalFavoriteList(favorites);
      setLoading(false);
    };
    loadData();
  }, [user, getReviews, fetchFavorites]);

  if (!reviewData) return <p>로딩 중...</p>;
  // console.log(reviewData);

  return (
    <main>
      <div className="inner px-[5vw]">
        <div className="my-page flex py-[2rem] gap-[2rem] h-[90vh] max-[768px]:h-[auto]">
          <nav className="dashboard-nav bg-[#252525] rounded-[20px] p-[2rem] h-fit">
            <Tabs tabs={tabs} pageType={"mypage"} />
          </nav>
          <section className="movie-tabs-content h-[100%] flex-1 max-[768px]:h-[auto]">
            <div className="h-[100%] p-[2rem] bg-[#252525] rounded-[20px]">
              <Outlet context={{ reviewData, favoriteList }} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
