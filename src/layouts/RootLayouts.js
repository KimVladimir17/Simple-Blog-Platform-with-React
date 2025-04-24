// Import React Components
import { NavLink, Outlet } from "react-router-dom";

// Import My Components
import DefaultNav from "./DefaultNav";
import UserNav from "./UserNav";

// import Hooks
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [userName, setUserName] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      const userObject = JSON.parse(storedUser);
      return userObject ? userObject.username : ""; // Или другой дефолт
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return ""; // Default empty name
    }
  });

  const [logged, setLogged] = useState(() => {
    const storedLogged = localStorage.getItem("logged");
    return storedLogged === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("logged", logged.toString());
  }, [logged]);

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
          {logged && (
            <UserNav setLogged={setLogged} userName={userName}></UserNav>
          )}
        </nav>
      </header>
      <main>
        <Outlet context={{ setLogged: setLogged, userName: userName }}></Outlet>
      </main>
    </div>
  );
}
