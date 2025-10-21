// hooks/useReviewAPI.js
import { useCallback } from "react";
import { useSupabase } from "../context/SupabaseContext";
import myReviewData from "../data/myReviewData.json";

export const useSupabaseReview = () => {
  const { supabase, user } = useSupabase();

  const insertDummyReviews = useCallback(async () => {
    const dummyData = [...myReviewData.reviews];

    const formattedData = dummyData.map((review) => ({
      user_id: user.id,
      id: review.id,
      title: review.title,
      review_text: review.review_text,
      rating: review.rating,
      review_date: review.review_date,
      poster_path: review.poster_path,
      vote_average: review.vote_average,
      total_results: review.total_results,
    }));

    const { error } = await supabase
      .from("movie_reviews")
      .insert(formattedData);

    if (error) {
      console.error("더미 리뷰 삽입 실패:", error.message);
    } else {
      console.log("✅ 더미 리뷰 삽입 완료!");
    }
  }, [supabase, user]);

  // 리뷰 불러오기
  const getReviews = useCallback(async () => {
    if (!user) return null;

    const { data: existing } = await supabase
      .from("movie_reviews")
      .select("id")
      .eq("user_id", user.id);

    if (existing.length === 0) {
      await insertDummyReviews(user);
    }

    const { data, error } = await supabase
      .from("movie_reviews")
      .select("*")
      .eq("user_id", user.id)
      .order("review_date", { ascending: false });

    if (error) {
      console.error("리뷰 가져오기 실패:", error.message);
      return {
        total_reviews: 0,
        average_rating: 0,
        rating_distribution: [],
        reviews: [], // ✅ 항상 빈 배열이라도 보장
      };
    }

    const total_reviews = data.length;
    const total_rating = data.reduce((sum, r) => sum + (r.rating || 0), 0);
    const average_rating =
      total_reviews === 0 ? 0 : total_rating / total_reviews;

    // ✅ 평점 분포 생성
    const rating_distribution = [1, 2, 3, 4, 5].map((n) => ({
      id: n,
      [`rating-${n}`]: data.filter((r) => r.rating === n).length,
    }));

    return {
      total_reviews,
      average_rating,
      rating_distribution,
      reviews: data,
    };
  }, [supabase, user, insertDummyReviews]);

  // 리뷰 추가
  const createReview = useCallback(
    async ({ title, rating, review_text }) => {
      if (!user) return;

      const { error } = await supabase.from("movie_reviews").insert([
        {
          title,
          rating,
          review_text,
          review_date: new Date().toISOString().split("T")[0],
          user_id: user.id,
        },
      ]);

      if (error) {
        console.error("리뷰 작성 실패:", error.message);
      }
    },
    [supabase, user]
  );

  // 리뷰 수정
  const updateReview = useCallback(
    async (id, updatedFields) => {
      const { error } = await supabase
        .from("movie_reviews")
        .update(updatedFields)
        .eq("id", id);

      if (error) {
        console.error("리뷰 수정 실패:", error.message);
      }
    },
    [supabase]
  );

  // 리뷰 삭제
  const deleteReview = useCallback(
    async (id) => {
      const { error } = await supabase
        .from("movie_reviews")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("리뷰 삭제 실패:", error.message);
      }
    },
    [supabase]
  );

  return {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
  };
};
