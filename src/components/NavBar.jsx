import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState(true);

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
        <div className="search-box w-[50%]">
          <input
            type="text"
            name="search"
            onChange={handleSearch}
            value={inputValue}
            className="w-[100%] bg-transparent border-b-[1px] border-[#6201e0] outline-none text-[12px] font-normal pb-[3px]"
          />
        </div>
        <div className="flex gap-[10px]">
          <Link to={`/login`} className="util-link" />
          <button
            onClick={toggleTheme}
            className="bg-[#333] text-[16px] rounded-[12px] px-[20px]"
          >
            {isDark ? (
              <div className="flex items-center gap-[5px]">
                <span>🌙</span>
              </div>
            ) : (
              <div className="flex items-center gap-[5px] ">
                <span>☀️</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
