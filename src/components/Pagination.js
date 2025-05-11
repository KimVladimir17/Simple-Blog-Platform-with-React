// Import Css Module
import { NavLink } from "react-router-dom";
import "../assets/styles/MyComponent.css";

const Pagination = ({ currentPage, totalArticlesPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalArticlesPage },
    (_, i) => i + 1
  );

  const makeSlug = (n) => `/articles/page${n}`;

  return (
    <div className="pagination">
      <NavLink
        to={makeSlug(Number(currentPage) - 1)}
        onClick={() => onPageChange(Number(currentPage) - 1)}
        className={`prev ${Number(currentPage) === 1 ? "disabled" : ""}`}
      >
        назад
      </NavLink>
      {pageNumbers.map((pageNum) => (
        <NavLink
          to={makeSlug(pageNum)}
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`number-page ${currentPage === pageNum ? "active" : ""}`}
        >
          {pageNum}
        </NavLink>
      ))}
      <NavLink
        to={makeSlug(Number(currentPage) + 1)}
        onClick={() => onPageChange(Number(currentPage) + 1)}
        disabled={Number(currentPage) === totalArticlesPage}
        className={`next ${
          Number(currentPage) === totalArticlesPage ? "disabled" : ""
        }`}
      >
        вперед
      </NavLink>
    </div>
  );
};

export default Pagination;
