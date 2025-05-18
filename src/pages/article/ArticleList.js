// Import Hooks
import React, { useState, useEffect } from "react";

// Import Css Module
import "../../assets/styles/Pages.css";

// Import My components
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import ArticleItem from "../article/components/ArticleItem";
import ErrorMessage from "../../components/ErrorMessage";
import { setLoader } from "../../plugins/axios-plugin";
import articlesService from "../../services/articles/articlesService";
import { useOutletContext } from "react-router-dom";

const ArticleListPage = React.memo(() => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCurrentPage, currentPage } = useOutletContext();
  const [articlesPerPage] = useState(5);
  const [totalArticlesCount, setTotalArticlesCount] = useState(0);

  useEffect(() => {
    setLoader(setLoading);
    return () => {
      setLoader(null);
    };
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        setTimeout(async () => {
          try {
            const response = await articlesService.getArticles(
              articlesPerPage,
              currentPage
            );
            setArticles(response.data.articles);
            setTotalArticlesCount(response.data.articlesCount);
          } catch (innerErr) {
            setError(innerErr.message);
          }
        }, 500);
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
            <ArticleItem article={article}></ArticleItem>
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
});

export default ArticleListPage;
