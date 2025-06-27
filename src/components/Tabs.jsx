export const Tabs = ({ tabs, setActiveTab, pageType }) => {
  const handleTab = (key) => {
    setActiveTab(key);
  };

  return (
    <div
      className={`flex ${
        pageType === "mypage" && "flex-col p-0 h-[100%] border-b-0"
      } gap-[20px] pb-[1.4rem] border-b-[1px] max-[768px]:pb-[1rem]`}
      style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTab(tab.key)}
          className="text-[1.4rem] max-[768px]:text-[1rem]"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
