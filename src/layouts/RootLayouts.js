// Import React Components
import { NavLink, Outlet } from "react-router-dom";

// Import My Components
import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

// import Hooks
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext"; // Corrected import

export default function RootLayout() {
  const { isAuthenticated, userName, logout, userImage } =
    useContext(AuthContext);

  return (
    <div className="root-layout">
      <header>
        <nav className="nav">
          <NavLink
            to="/"
            style={{ color: "#000", border: "none" }}
            className="nav-link"
          >
            Realworld Blog
          </NavLink>
          {isAuthenticated ? (
            <UserNav
              userImage={userImage ? userImage : null}
              userName={userName ? userName : "User"}
              logout={logout}
            ></UserNav>
          ) : (
            <DefaultNav></DefaultNav>
          )}
        </nav>
      </header>
      <main>
        <Outlet
        // context={{
        //   userName: userName ? userName.username : "User",
        // }}
        ></Outlet>
      </main>
    </div>
  );
}
