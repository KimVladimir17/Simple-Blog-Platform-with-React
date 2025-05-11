// Import React Components
import { NavLink, Outlet } from "react-router-dom";

// Import My Components
import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

// import Hooks
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext"; // Corrected import
import { useLocation } from "react-router-dom";
import favoriteToggle from "../customhooks/useFavoriteArticle";

export default function RootLayout() {
  const { isAuthenticated, userName, logout, userImage } =
    useContext(AuthContext);
  const [updateStatusList, setUpdateStatusList] = useState({});
  const location = useLocation();

  useEffect(() => {
    try {
      if (Object.keys(updateStatusList).length > 0) {
        favoriteToggle(isAuthenticated, updateStatusList);
        setUpdateStatusList({});
      }
    } catch (err) {
      console.error("Ошибка при отправке изменений:", err);
    }
  }, [location.pathname]);

  const logOutHadler = () => {
    favoriteToggle(isAuthenticated, updateStatusList);
    setUpdateStatusList({});
    logout();
  };
  return (
    <div className="root-layout">
      <header>
        <nav className="nav">
          <NavLink
            to="/articles/page1"
            style={{ color: "#000", border: "none" }}
            className="nav-link"
          >
            Realworld Blog
          </NavLink>
          {isAuthenticated ? (
            <UserNav
              userImage={userImage ? userImage : null}
              userName={userName ? userName : "User"}
              logout={logOutHadler}
            ></UserNav>
          ) : (
            <DefaultNav></DefaultNav>
          )}
        </nav>
      </header>
      <main>
        <Outlet context={{ setUpdateStatusList: setUpdateStatusList }}></Outlet>
      </main>
    </div>
  );
}
