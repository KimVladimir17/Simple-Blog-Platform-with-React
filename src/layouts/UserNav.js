import { NavLink, useNavigate } from "react-router-dom";
import User from "../components/User.js";

export default function UserNav({ logged }) {
  const navigate = useNavigate();
  const logOutHandler = (e) => {
    localStorage.clear();
    logged(false);
    navigate("/");
  };

  return (
    <div className="nav__links">
      <a>Create article</a>
      <NavLink to="/edit-profile" className="nav-login-user">
        <User></User>
      </NavLink>
      <NavLink to="/" className="nav-logout" onClick={logOutHandler}>
        Log Out
      </NavLink>
    </div>
  );
}
