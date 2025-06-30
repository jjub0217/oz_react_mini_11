import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

export const MyProfile = () => {
  const { user, updateNickname, updateProfileImage, updateBackgroundImage } =
    useSupabaseAuth();
  const [nickname, setNickname] = useState(user?.user_metadata?.nickname || "");
  const { email, user_metadata } = user;
  const { name, backgroundImage } = user_metadata;

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    backgroundImage || null
  );

  const [selectedFile, setSelectedFile] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(nickname);

  const hiddenInputRef = useRef(null);
  const hiddenBackgroundInputRef = useRef(null);

  if (!user) {
    return <p className="text-white">로그인된 유저 정보가 없습니다.</p>;
  }

  const handleNicknameSave = async () => {
    if (!inputValue) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    const updated = await updateNickname(inputValue);
    if (updated) {
      setNickname(inputValue);
      setIsEditing(false);
      alert("닉네임이 변경되었습니다.");
    }
  };

  const handleButtonClick = () => {
    hiddenInputRef.current?.click();
  };
  const handleBackgroundButtonClick = () => {
    hiddenBackgroundInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // console.log("선택된 파일 👉", file);

    if (file) {
      const imageUrl = await updateProfileImage(file, user.id);
      // console.log("업로드된 이미지 URL 👉", imageUrl);

      if (imageUrl) {
        alert("프로필 이미지가 변경되었습니다.");
      }
    }
  };

  const handleBackgroundImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await updateBackgroundImage(file, user.id);
    if (imageUrl) {
      setBackgroundImageUrl(imageUrl);
      localStorage.setItem("profileBg", imageUrl);
      alert("배경 이미지가 저장되었습니다.");
    }
  };

  const handleCancel = () => {
    setInputValue(nickname);
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <div
        className="h-[17vh]"
        style={{
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: backgroundImageUrl ? undefined : "white",
        }}
      >
        <button
          type="button"
          onClick={handleBackgroundButtonClick}
          className="w-10 h-10 rounded-full bg-white absolute right-0 bottom-[-5%] flex items-center justify-center"
        >
          <FaPlus color="#6201e0" className="text-[1.4rem]" />
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundImageChange}
          ref={hiddenBackgroundInputRef}
          style={{ display: "none" }}
        />
      </div>

      <div className=" flex flex-col gap-[2rem] absolute top-[80%] left-[30px] max-[768px]:left-[10px]">
        <div className="flex items-end gap-[2rem] max-[768px]:flex-col max-[768px]:items-start ">
          <div className="w-[120px] h-[120px] max-[768px]:w-[100px] max-[768px]:h-[100px] rounded-full bg-gray-700  flex items-center justify-center relative">
            <img
              src={user?.user_metadata?.profileImage || "images/user.png"}
              alt="프로필 이미지"
              className="w-full h-[5rem] rounded-full object-contain"
            />
            <button
              type="button"
              onClick={handleButtonClick}
              className="w-10 h-10 rounded-full bg-white absolute right-0 bottom-[-5%] flex items-center justify-center"
            >
              <FaPlus color="#6201e0" className="text-[1.4rem]" />
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={hiddenInputRef}
              style={{ display: "none" }}
            />
          </div>
          <div className="flex flex-col gap-[3px] items-start pt-[10px] translate-y-[10px]">
            <span className="text-[1.4rem] max-[1700px]:text-[1.2rem]">
              {name}
            </span>
            <p className="text-[1.1rem]">{email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-[0.5rem] items-start pt-[30px]">
          <div className="text-[1.2rem] font-semibold flex gap-[10px]">
            <span>이름</span>
            <span>{name}</span>
          </div>

          {!isEditing ? (
            <div className="flex items-center gap-[1rem]">
              <p className="text-[1.1rem] font-semibold flex gap-[10px]">
                <span>닉네임</span>
                {nickname || <span className="text-[#aaa]">없음</span>}
              </p>
              <button
                className="text-sm px-2 py-1  rounded  bg-[#6201e0] text-white"
                onClick={() => setIsEditing(true)}
              >
                변경
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <span className="text-[1.1rem] font-semibold">닉네임</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="px-2 py-1 rounded bg-white text-black w-[200px]"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleNicknameSave}
                  className="px-3 py-1 rounded bg-[#6201e0] hover:bg-green-700 text-sm"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-sm"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
