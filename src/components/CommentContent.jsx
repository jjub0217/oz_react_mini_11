import { useState } from "react";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";

export const CommentContent = ({ detailInfo, commentCount }) => {
  // console.log(detailInfo);
  const [inputCommentValue, setInputCommentValue] = useState("");

  const handleComment = (e) => {
    setInputCommentValue(e.target.value);
  };
  return (
    <div className="mt-6">
      <p className="text-gray-400 text-[1.4rem] max-[768px]:text-[1rem]">
        리뷰 <span>{commentCount}</span>개
        {/* 댓글 {comments.length.toLocaleString()}개 ↻ */}
      </p>
      <input
        type="text"
        placeholder="리뷰를 입력해주세요."
        className="w-full p-[15px] bg-gray-900 text-white  rounded-[10px] text-[13px] mt-[10px]"
        value={inputCommentValue}
        onChange={handleComment}
      />

      {detailInfo.length ? (
        detailInfo.map((el) => (
          <div key={el.id} className="pt-[2rem]">
            <div className="text-sm text-gray-400 flex gap-[10px] items-center">
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
                      : "w-[1vw] h-[1vw]"
                  }
                />
              </div>
              <span className="font-semibold text-white text-[1rem]">
                {el.author}
              </span>
              {el.updated_ate}
            </div>
            <p className="mt-[1rem] text-gray-300 whitespace-pre-line text-[1rem] max-[768px]:text-[0.9rem]">
              {el.content}
            </p>
            {/* <p className="text-purple-400 mt-1">👍 {c.likes}</p> */}
          </div>
        ))
      ) : (
        <p className="text-[1rem] mt-[2rem]">
          리뷰가 아직 없습니다. 리뷰를 달아주세요.
        </p>
      )}
    </div>
  );
};
