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
        to={makeSlug(currentPage - 1)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="prev "
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
        to={makeSlug(currentPage + 1)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalArticlesPage}
        className="next"
      >
        вперед
      </NavLink>
    </div>
  );
};

export default Pagination;
