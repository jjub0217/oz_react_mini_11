import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");
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

  return (
    <nav className="">
      <div className="inner flex h-[42px] justify-between items-center">
        <h1 className="text-[#fff] font-semibold">
          <Link to="/" className="flex items-center">
            <span className="font-Pixgamer text-[23px] font-black">OZ</span>
            <span className="logo">무비</span>
          </Link>
        </h1>
        <div className="search-box w-[50%]">
          <input
            type="text"
            name="search"
            onChange={handleSearch}
            value={inputValue}
            className="w-[100%] bg-transparent border-b-[1px] border-[#6201e0] outline-none text-[#fff] text-[12px] font-normal pb-[3px]"
          />
        </div>
        <div className="flex gap-[10px]">
          <Link to="" className="util-link">
            로그인
          </Link>
          <Link to="" className="util-link">
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
