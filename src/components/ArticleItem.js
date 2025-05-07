import React, { memo, useContext, useState } from "react";
// Import Css Module
import "../assets/styles/MyComponent.css";

// Import Icon
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Import My components
import User from "./User";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthContext";

const ArticleItem = ({ article, isAuthor, onDelete, onFavoriteToggle }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const formattedDate = new Date(article.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

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
    try {
      await onFavoriteToggle(article.slug, !article.favorited); // Переключить статус избранного в родительском компоненте
    } catch (error) {
      console.error("Ошибка добавления в избранное:", error); // Запись в лог для отладки
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
            {article.favorited && isAuthenticated ? (
              <FaHeart className="article__box-icon active" />
            ) : (
              <FaRegHeart className="article__box-icon"></FaRegHeart>
            )}
          </button>
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
