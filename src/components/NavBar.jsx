import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex h-[60px] justify-between items-center max-w-screen-2xl px-8 mx-auto">
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
          className="w-[100%] bg-transparent border-b-[1px] border-[#6201e084] outline-none text-[#fff] text-[12px] font-normal pb-[3px]"
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
    </nav>
  );
}
