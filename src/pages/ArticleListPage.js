import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ArticleListPage.css"; // CSS Module
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

import ArticleItem from "../components/ArticleItem";
import ErrorMessage from "../components/ErrorMessage";
import { NavLink } from "react-router-dom";

const API_URL = "https://realworld.habsidev.com/api/articles";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [totalArticlesCount, setTotalArticlesCount] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          try {
            const response = await axios.get(
              `${API_URL}?limit=${articlesPerPage}&offset=${
                (currentPage - 1) * articlesPerPage
              }`
            );
            setArticles(response.data.articles);
            setTotalArticlesCount(response.data.articlesCount);
          } catch (innerErr) {
            setError(innerErr.message);
          } finally {
            setLoading(false);
          }
        }, 200);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArticles();
  }, [currentPage, articlesPerPage]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  if (loading) return <Loading></Loading>;

  if (error) return <ErrorMessage message={error}></ErrorMessage>;

  return (
    <div className="container">
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.slug} className="article-item">
            <NavLink to={`/articles/${article.slug}`} className="article-link">
              <ArticleItem article={article}></ArticleItem>
            </NavLink>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalArticlesPage={Math.ceil(totalArticlesCount / articlesPerPage)}
        onPageChange={handlePageChange}
      ></Pagination>
    </div>
  );
};

export default ArticleListPage;
