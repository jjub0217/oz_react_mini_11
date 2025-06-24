import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout({ isLogged, setIsLogged }) {
  return (
    <>
      <NavBar isLogged={isLogged} setIsLogged={setIsLogged} />
      <Outlet />
    </>
  );
}

export default Layout;
