import "./Pagination.css";

const Pagination = ({ currentPage, totalArticlesPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalArticlesPage },
    (_, i) => i + 1
  );

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="prev "
      >
        назад
      </button>
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`number-page ${currentPage === pageNum ? "active" : ""}`}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalArticlesPage}
        className="next"
      >
        вперед
      </button>
    </div>
  );
};

export default Pagination;
