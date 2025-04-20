import { NavLink, Outlet } from "react-router-dom";
import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";
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
