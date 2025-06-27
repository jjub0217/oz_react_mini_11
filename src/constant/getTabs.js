export const getTabs = (commentCount) => [
  { label: `리뷰(${commentCount.toLocaleString()})`, key: "comments" },
  { label: "추천 콘텐츠", key: "recommend" },
  // { label: "상세정보", key: "info" },
];
export const getMyTabs = () => [
  { label: "홈", key: "home" },
  { label: "나의 리뷰", key: "review" },
  { label: "관심 영화", key: "favorites" },
  // { label: "비밀번호 변경", key: "password" },
  { label: "프로필 설정", key: "profile" },
];
