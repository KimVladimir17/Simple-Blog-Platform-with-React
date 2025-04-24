// Import React Components
import { NavLink, useNavigate } from "react-router-dom";

// Import My Components
import User from "../components/User.js";

export default function UserNav({ setLogged, userName }) {
  const navigate = useNavigate();
  const logOutHandler = (e) => {
    setLogged(false);
    navigate("/");
  };

  return (
    <div className="nav__links">
      <NavLink to="/create-new-article" className="nav-link-creat-article">
        Create article
      </NavLink>
      <NavLink to="/edit-profile" className="nav-login-user">
        <User userName={userName}></User>
      </NavLink>
      <NavLink to="/" className="nav-logout" onClick={logOutHandler}>
        Log Out
      </NavLink>
    </div>
  );
}
