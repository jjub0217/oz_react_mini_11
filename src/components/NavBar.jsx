import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();
  const navigateDebounce = useDebounce();

  const { logout, user } = useSupabaseAuth();

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setInputValue(searchValue);
    if (searchValue.length === 0) {
      navigate("/");
    } else {
      navigateDebounce(searchValue);
    }
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  const handleLogin = () => {
    navigate("/login");
  };

  const requestLogOut = async (e) => {
    e.preventDefault();
    const { error } = await logout();
    if (!error) {
      setIsHovering(false);
      navigate("/");
    }
  };

  const handleMyPage = () => {
    navigate("/my-page");
  };

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("light", !isDark);
  }, [isDark]);

  return (
    <nav className="">
      <div className="inner flex h-[74px] justify-between items-center px-[5vw]">
        <h1 className="font-semibold">
          <Link to="/" className="flex items-center">
            <span className="font-Pixgamer text-[2.4rem] font-black">OZ</span>
            <span className="logo text-[1.5rem] max-[480px]:hidden">무비</span>
          </Link>
        </h1>
        <div
          className={`parent flex gap-[10px] items-center  ${
            isHovering ? "relative" : ""
          }`}
        >
          <div className="search-box">
            <input
              type="text"
              name="search"
              onChange={handleSearch}
              value={inputValue}
              className="w-[100%] bg-transparent outline-none text-[12px] font-normal pb-[3px]"
            />
          </div>
          <button onClick={toggleTheme} className="rounded-full">
            {isDark ? (
              <div className="p-[10px]">
                <p className="h-[16px] leading-[16px]">🌙</p>
              </div>
            ) : (
              <div className="p-[10px]">
                <p className="h-[16px] leading-[16px]">☀️</p>
              </div>
            )}
          </button>
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="w-[43px] h-[43px] rounded-full bg-gray-700  flex items-center justify-center">
              <img
                src={user?.user_metadata?.profileImage || "images/user.png"}
                alt="프로필 이미지"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div
              className={`child ${
                isHovering ? "flex" : "hidden"
              } absolute right-0 top-[100%] px-[25px] py-[10px] flex-col gap-[10px] bg-[#333] z-10`}
            >
              {user ? (
                <>
                  {" "}
                  <button type="button" onClick={handleMyPage}>
                    마이페이지
                  </button>
                  <button type="button" onClick={requestLogOut}>
                    로그아웃
                  </button>
                </>
              ) : (
                <button type="button" onClick={handleLogin}>
                  로그인
                </button>
              )}
            </div>
          </div>

          {/* <Link to={`/login`} className="" /> */}
        </div>
      </div>
    </nav>
  );
}
