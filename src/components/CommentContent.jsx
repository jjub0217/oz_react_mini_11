import { useState } from "react";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";

export const CommentContent = ({ detailInfo, commentCount }) => {
  // console.log(detailInfo);
  const [inputCommentValue, setInputCommentValue] = useState("");
  const [selectIds, setSelectIds] = useState([]);

  const handleComment = (e) => {
    setInputCommentValue(e.target.value);
  };

  const toggleSelect = (id) => {
    // 이전 id랑 지금 들어온 id랑 같다 === 펼쳐진걸 또 눌렀다 === 펼쳐져있으니까 접어야 한다.
    setSelectIds((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-6">
      <p className="text-gray-400 text-[1.4rem] max-[1279px]:text-[1.2rem] max-[768px]:text-[1rem]">
        리뷰 <span>{commentCount}</span>개
      </p>
      <input
        type="text"
        placeholder="리뷰를 입력해주세요."
        className="w-full p-[15px] bg-gray-900 text-white  rounded-[10px] text-[13px] mt-[10px]"
        value={inputCommentValue}
        onChange={handleComment}
      />

      {detailInfo.length ? (
        detailInfo.map((el) => {
          const isExpanded =
            Array.isArray(selectIds) && selectIds.includes(el.id);
          return (
            <div
              key={el.id}
              style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              className="pt-[2rem] border-b-[1px] pb-[20px]"
            >
              <div className="text-sm text-gray-400 flex gap-[10px] items-center pb-[1rem]">
                <div
                  className={`${
                    el.author_details.avatar_path
                      ? ""
                      : "flex items-center justify-center"
                  } w-[3rem] h-[3rem] max-[768px]:w-[2rem] max-[768px]:h-[2rem] rounded-full overflow-hidden`}
                  style={
                    el.author_details.avatar_path
                      ? undefined
                      : { background: "#6201e0" }
                  }
                >
                  <img
                    src={
                      el.author_details.avatar_path
                        ? `${IMAGE_BASE_URL.backdrop}${el.author_details.avatar_path}`
                        : "../../public/images/user.png"
                    }
                    alt={el.author}
                    className={
                      el.author_details.avatar_path
                        ? "w-[100%] h-[100%] object-cover"
                        : "w-[1.5rem] h-[1.5rem]"
                    }
                  />
                </div>
                <span className="font-semibold text-[1rem] max-[1279px]:text-[15px]">
                  {el.author}
                </span>
                {el.updated_ate}
              </div>
              <div className={`review-content ${isExpanded ? "expanded" : ""}`}>
                <p
                  className={`whitespace-pre-line text-gray-300 text-[1rem] max-[768px]:text-[0.9rem] max-[1279px]:text-[15px] ${
                    isExpanded ? "" : "review-content__text"
                  }
                  `}
                >
                  {el.content}
                </p>
              </div>

              {el.content.length > 400 && (
                <button
                  className={`text-[#aaa] underline text-sm mt-2
                  `}
                  type="button"
                  onClick={() => toggleSelect(el.id)}
                >
                  {/* {el.content.length} */}
                  {isExpanded ? "접기" : "더보기"}
                </button>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-[1rem] mt-[2rem]">
          리뷰가 아직 없습니다. 리뷰를 달아주세요.
        </p>
      )}
    </div>
  );
};
