import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getMyTabs } from "../constant/getTabs";
import { useSupabase } from "../context/SupabaseContext";
import { useSupabaseFavorite } from "../hooks/useSupabaseFavorite";
import { useSupabaseReview } from "../hooks/useSupabaseReview";
import { Tabs } from "./Tabs";

export const MyPage = () => {
  const tabs = getMyTabs();

  const { getReviews, updateReview, deleteReview } = useSupabaseReview();
  const { user, setFavoriteList: setGlobalFavoriteList } = useSupabase();
  const { fetchFavorites } = useSupabaseFavorite();
  const [favoriteList, setFavoriteList] = useState([]);
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getReviews();
      if (data) setReviewData(data);
    };
    fetch();
  }, [getReviews]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const favorites = await fetchFavorites(user.id);
        setFavoriteList(favorites);
        setGlobalFavoriteList(favorites);
      }
      setLoading(false);
    };
    loadFavorites();
  }, [user]);

  if (!reviewData) return <p>로딩 중...</p>;
  // console.log(reviewData);

  return (
    <main>
      <div className="inner px-[5vw]">
        <div className="my-page flex py-[2rem] gap-[2rem] h-[90vh]">
          <nav className="dashboard-nav bg-[#252525] rounded-[20px] p-[2rem] h-fit">
            <Tabs tabs={tabs} pageType={"mypage"} />
          </nav>
          <section className="movie-tabs-content h-[100%] flex-1 max-[768px]:h-[auto]">
            <div className="h-[100%] p-[2rem] bg-[#252525] rounded-[20px] ">
              <Outlet context={{ reviewData, favoriteList }} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
