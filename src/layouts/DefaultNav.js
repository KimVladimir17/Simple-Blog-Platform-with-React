// Import React Components
import { NavLink } from "react-router-dom";

export default function DefaultNav() {
  return (
    <div className="nav__links">
      <NavLink to="/sign-in" className="nav-link ">
        Sign In
      </NavLink>
      <NavLink to="/sign-up" className="nav-link">
        Sign Up
      </NavLink>
    </div>
  );
}
