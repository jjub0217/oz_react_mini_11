import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

export const ProfileBox = () => {
  const { user } = useSupabaseAuth();
  if (!user) {
    return <p className="text-white">로그인된 유저 정보가 없습니다.</p>;
  }

  const { email, user_metadata } = user;
  const { name, profileImage } = user_metadata;

  return (
    <div className="text-white flex flex-col gap-[2rem]">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-700">
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={null} alt="프로필 이미지" className="util-link" />
        )}
      </div>
      <div className="flex flex-col gap-[0.5rem] items-start">
        <p className="text-[1.1rem] text-[#ccc]">{email}</p>
        <div className="text-[1.2rem] font-semibold">
          <span>이름</span>
          <span>{name}</span>
        </div>
      </div>
    </div>
  );
};
