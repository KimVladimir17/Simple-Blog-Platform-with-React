// Import React Components
import { NavLink, Outlet } from "react-router-dom";

// Import My Components
import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

// import Hooks
import { useState } from "react";

export default function RootLayout() {
  const [logged, setLogged] = useState(false);

  const logging = (event) => {
    setLogged(event);
  };

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
          {!logged && <DefaultNav></DefaultNav>}
          {logged && <UserNav logged={logging}></UserNav>}
        </nav>
      </header>
      <main>
        <Outlet context={{ logging }}></Outlet>
      </main>
    </div>
  );
}
