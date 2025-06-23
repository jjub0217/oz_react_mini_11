export const getTabs = (commentCount) => [
  { label: `리뷰(${commentCount.toLocaleString()})`, key: "comments" },
  { label: "추천 콘텐츠", key: "recommend" },
  // { label: "상세정보", key: "info" },
];
