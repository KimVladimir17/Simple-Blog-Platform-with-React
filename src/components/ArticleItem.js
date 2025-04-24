// Import Css Module
import "../assets/styles/MyComponent.css";

// Import Icon
import { FaRegHeart } from "react-icons/fa";

// Import My components
import User from "./User";

const ArticleItem = ({ article }) => {
  const validTags = Array.isArray(article.tagList)
    ? article.tagList.filter((tag) => tag != null)
    : [];
  const hasValidTags = validTags.length > 0;
  return (
    <div className="article__info">
      <div className="article__box">
        <div className="article__box-title">
          <h4>{article.title}</h4>
          <FaRegHeart className="article__box-icon" />
          <p>12</p>
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
        <p className="article__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="article__user">
        <User userName={article.author.username}></User>
      </div>
    </div>
  );
};

export default ArticleItem;
