// Import Css Module
import "../assets/styles/MyComponent.css";

// Import Icon
import { FaRegHeart } from "react-icons/fa";

// Import My components
import User from "./User";
import { NavLink } from "react-router-dom";

const ArticleItem = ({ article, isAuthor, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options); // Используйте нужную локаль
  };

  const formattedDate = formatDate(article.updatedAt);

  const validTags = Array.isArray(article.tagList)
    ? article.tagList.filter((tag) => tag != null)
    : [];
  const hasValidTags = validTags.length > 0;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(article.slug); // Assuming you have a function to handle deletion in the parent component
    }
  };

  return (
    <div className="article__info">
      <div className="article__box">
        <div className="article__box-title">
          <h4>{article.title}</h4>
          <FaRegHeart className="article__box-icon" />
          <p>{article.favoritesCount}</p>
        </div>
        <div className="article__tags-container">
          {hasValidTags ? (
            validTags.map((tag, index) => (
              <p className="article__tag" key={index}>
                {tag}
              </p>
            ))
          ) : (
            <p className="article__tag">no tag</p>
          )}
        </div>
        <p className="article__text">{article.description}</p>
      </div>
      <div className="article__user">
        <User
          userName={article.author.username}
          userImage={article.author.image}
          formattedDate={formattedDate}
        ></User>{" "}
        {isAuthor && (
          <div className="article__user-buttons">
            <button className="article-btn delete" onClick={handleDelete}>
              Delete
            </button>
            <NavLink
              className="article-btn edite"
              to={`/articles/${article.slug}/edit`}
            >
              Edit
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleItem;
