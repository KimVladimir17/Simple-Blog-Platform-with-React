// Import React Components
import { NavLink } from "react-router-dom";

// Import My Components
import User from "../components/User.js";
export default function UserNav({ userName, logout, userImage }) {
  return (
    <div className="nav__links">
      <NavLink to="/create-new-article" className="nav-link-creat-article">
        Create article
      </NavLink>
      <NavLink to="/edit-profile" className="nav-login-user">
        <User userName={userName} userImage={userImage}></User>
      </NavLink>
      <NavLink to="/" className="nav-logout" onClick={logout}>
        Log Out
      </NavLink>
    </div>
  );
}
