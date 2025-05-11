// Import React Components
import { NavLink } from "react-router-dom";

// Import My Components
import User from "../components/User.js";
export default function UserNav({ userName, logout, userImage }) {
  return (
    <div className="nav__links">
      <NavLink
        to="/articles/create-new-article"
        className="nav-link-creat-article"
      >
        Create article
      </NavLink>
      <NavLink to="/articles/edit-profile" className="nav-login-user">
        <User userName={userName} userImage={userImage}></User>
      </NavLink>
      <NavLink to="/articles/page1" className="nav-logout" onClick={logout}>
        Log Out
      </NavLink>
    </div>
  );
}
