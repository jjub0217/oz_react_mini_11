import { useState } from "react";
import { getMyTabs } from "../constant/getTabs";
import MyFavorite from "./MyFavorite";
import { MyReview } from "./MyReview";
import { ProfileBox } from "./ProfileBox";
import { Tabs } from "./Tabs";

export const MyPage = () => {
  const tabs = getMyTabs();
  const [activeTab, setActiveTab] = useState("home");
  const changeValue = (e) => {
    // if (name === "profileImage") {
    //   setProfileImageFile(files[0]);
    //   return; // file input은 errorType 검사 필요 없음
    // }
    // const { name, value } = e.target;
    // const nextUserInfo = { ...userInfo, [name]: value };
    // setUserInfo(nextUserInfo);
    // const error = validateField(name, value, nextUserInfo);
    // setErrorType((prev) => ({ ...prev, [name]: error }));
  };
  return (
    <main>
      <div className="inner px-[5vw]">
        <div className="my-page flex p-[5vw] gap-[2rem] h-[90vh]">
          <nav className="bg-[#252525] rounded-[20px] p-[2rem] w-[10vw]">
            <Tabs tabs={tabs} setActiveTab={setActiveTab} pageType={"mypage"} />
          </nav>
          <div className="movie-tabs-content h-[100%] w-[90vw] rounded-[20px] overflow-hidden">
            <div
              className={`${
                activeTab === "profile" ? "block h-[20vh] bg-[#fff]" : "hidden"
              }`}
            ></div>
            <div className="h-[100%] p-[3rem] bg-[#252525]">
              <div
                style={{
                  display: activeTab === "review" ? "block" : "none",
                  height: activeTab === "review" ? "100%" : "",
                  overflow: activeTab === "review" ? "hidden" : "",
                }}
              >
                <MyReview />
              </div>
              <div
                style={{ display: activeTab === "profile" ? "block" : "none" }}
              >
                <ProfileBox />
              </div>
              <div
                style={{
                  display: activeTab === "favorites" ? "block" : "none",
                }}
                className="h-[100%] overflow-hidden"
              >
                <MyFavorite />
              </div>
            </div>
          </div>
          {/* <div>
            <div>
              <img src={null} alt="" />
            </div>
            <InputField
              label="프로필 이미지"
              name="profileImage"
              type="file"
              onChange={changeValue}
              errorMessage=""
            />
          </div> */}
        </div>
      </div>
    </main>
  );
};
