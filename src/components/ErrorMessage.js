import { NavLink } from "react-router-dom";

const ErrorMessage = ({ message }) => {
  return (
    <div className="container">
      <div className="error-massege">
        <p>{message}</p>
        <NavLink to="/">Back to the page</NavLink>
      </div>
    </div>
  );
};

export default ErrorMessage;
