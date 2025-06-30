import { useNavigate } from "react-router-dom";

export const Tabs = ({ tabs, setActiveTab, pageType }) => {
  const navigate = useNavigate();
  const handleTab = (key) => {
    const tabKey = key;

    if (pageType === "mypage") {
      if (tabKey === "review") {
        navigate("/my-page/reviews");
      } else if (tabKey === "favorites") {
        navigate("/my-page/favorites");
      } else if (tabKey === "profile") {
        navigate("/my-page/profile");
      } else {
        navigate("/my-page");
      }
    } else {
      setActiveTab(tabKey);
    }
    // console.log(tabKey);
  };

  return (
    <div
      className={`flex ${
        pageType === "mypage" && "my-page-nav flex-col p-0 h-[100%] pb-0"
      } gap-[20px] pb-[1.4rem] border-b-[1px] max-[1700px]:text-[1rem] max-[768px]:pb-[1rem]`}
      style={{
        borderColor:
          pageType === "mypage" ? "transparent" : "rgba(255, 255, 255, 0.2)",
        border: pageType === "mypage" ? "0" : "auto",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTab(tab.key)}
          className="text-[1.4rem] max-[1700px]:text-[1rem] max-[768px]:text-[1rem]"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
