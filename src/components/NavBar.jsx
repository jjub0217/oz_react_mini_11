import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();
  const navigateDebounce = useDebounce();

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
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
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
          {isLogged ? (
            <div>
              <button className="log util-link"></button>
              <div
                className={`child ${
                  isHovering ? "flex" : "hidden"
                } absolute right-0 top-[100%] px-[25px] py-[10px] flex-col gap-[10px] bg-[#333] z-10`}
              >
                <p>관심목록</p>
                <p>로그아웃</p>
              </div>
            </div>
          ) : (
            <button className="util-link" onClick={handleLogin}></button>
          )}
          {/* <Link to={`/login`} className="" /> */}
        </div>
      </div>
    </nav>
  );
}
