import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
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
          <div className="nav__links">
            <NavLink to="sign-in" className="nav-link ">
              Sign In
            </NavLink>
            <NavLink to="sign-up" className="nav-link">
              Sign Up
            </NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
