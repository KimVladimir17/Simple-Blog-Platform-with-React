import React, { memo, useContext, useEffect, useState } from "react";
// Import Css Module
import "../../../assets/styles/MyComponent.css";

// Import Icon
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Import My components
import User from "../../../components/User";
import { NavLink } from "react-router-dom";
import Modal from "../../../components/Modal";
import { AuthContext } from "../../../contexts/AuthContext";

const ArticleItem = ({ article, isAuthor, onDelete, setUpdateStatusList }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [favorited, setFavorited] = useState(article.favorited);
  const [favoritedCount, setFavoritedCount] = useState(article.favoritesCount);
  const formattedDate = new Date(article.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  useEffect(() => {
    setFavorited(article.favorited);
    setFavoritedCount(article.favoritesCount);
    setUpdateStatusList((prev) => ({
      ...prev,
    }));
  }, [article.favorited]);

  const validTags = article.tagList?.filter((tag) => tag != null) || [];

  const hasValidTags = validTags.length > 0;

  const handleDelete = () => {
    setShowModal(true);
  };

  const deleteArticle = () => {
    onDelete(article.slug);
  };

  const FavoriteBtn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      favorited ? setFavorited(false) : setFavorited(true);
      const newFavorited = !favorited;
      setFavorited(newFavorited);
      setFavoritedCount((prev) => (newFavorited ? prev + 1 : prev - 1));
      setUpdateStatusList((prev) => ({
        ...prev,
        [article.slug]: newFavorited,
      }));
    }
  };

  return (
    <div className="article__info">
      <div className="article__box">
        <div className="article__box-title">
          <NavLink to={`/articles/${article.slug}`} className="article-link">
            <h4>{article.title}</h4>
          </NavLink>
          <button onClick={FavoriteBtn}>
            {favorited && isAuthenticated ? (
              <FaHeart className="article__box-icon active" />
            ) : (
              <FaRegHeart className="article__box-icon"></FaRegHeart>
            )}
          </button>
          <p>{favoritedCount}</p>
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
            {showModal && (
              <Modal
                show={showModal}
                onCloseModal={setShowModal}
                onConfirmDelete={deleteArticle}
              ></Modal>
            )}
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

export default memo(ArticleItem);
