// Import React Components
import { NavLink, Outlet, useParams } from "react-router-dom";

// Import My Components
import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

// import Hooks
import { useContext, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

export default function RootLayout() {
  const { pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const { isAuthenticated, userName, logout, userImage } =
    useContext(AuthContext);

  const logOutHadler = () => {
    setCurrentPage(1);
    logout();
  };

  const mainList = () => {
    setCurrentPage(1);
  };
  return (
    <div className="root-layout">
      <header>
        <nav className="nav">
          <NavLink
            to="/articles/page1"
            onClick={mainList}
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
        <Outlet
          context={{
            currentPage: currentPage,
            setCurrentPage: setCurrentPage,
          }}
        ></Outlet>
      </main>
    </div>
  );
}
