import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
  const location = useLocation();
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(
    window.innerWidth <= 1024
  );

  // 리사이즈 감지
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLoginOrSignup =
    location.pathname === "/login" || location.pathname === "/signup";

  const hideNav = isLoginOrSignup && isTabletOrSmaller;

  return (
    <>
      {!hideNav && <NavBar />}
      <Outlet />
    </>
  );
}

export default Layout;
