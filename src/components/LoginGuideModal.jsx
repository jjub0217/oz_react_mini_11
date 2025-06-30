import { useNavigate } from "react-router-dom";

export const LoginGuideModal = ({ onClose }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-60">
      <div className="inner bg-[#252525] text-white p-[50px] rounded-[20px] text-center shadow-lg">
        <h2 className="text-[1.5rem] mb-[30px]">🔒 로그인이 필요합니다</h2>
        <p className="mb-[25px] text-[0.95rem] text-[#ccc] leading-[1.5]">
          로그인하시면 관심 영화 등록, 마이페이지 관리 등의 기능을 사용할 수
          있습니다. <br />
          지금 로그인하고 나만의 영화 기록을 시작해보세요! 🎬
        </p>
        <div className="flex justify-center gap-[10px]">
          <button
            onClick={handleLogin}
            className="bg-[#6201e0] px-[20px] py-[10px] rounded-[10px]"
          >
            로그인 하러 가기
          </button>
          <button
            onClick={onClose}
            className="bg-[#666] px-[20px] py-[10px] rounded-[10px]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
