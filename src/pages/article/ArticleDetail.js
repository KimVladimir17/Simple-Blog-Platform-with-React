// Import Hooks
import { useState, useEffect, useContext } from "react";

// Import React Components
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// Import My Components
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleItem from "../article/components/ArticleItem";
import { setLoader } from "../../plugins/axios-plugin";

// Import Css Module
import "../../assets/styles/Pages.css";
import { AuthContext } from "../../contexts/AuthContext";
import articlesService from "../../services/articles/articlesService";

const useFetchArticle = (slug) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoader(setLoading);
    return () => {
      setLoader(null);
    };
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setTimeout(async () => {
          try {
            const response = await articlesService.getArticleBySlug(slug);
            setArticle(response);
          } catch (innerErr) {
            setError(innerErr.message);
          }
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchArticle();
  }, [slug]);

  return { article, loading, error };
};

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const { article, loading, error } = useFetchArticle(slug);
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  if (!article) return <p>Article not found.</p>;

  const markdownMainText = `### Author: ${article.author?.username || "Unknown"}
  ${article.body}
  ${article.description}
  `;

  const markdownTags =
    article.tagList.length === 0
      ? "No tags"
      : article.tagList
          .map(
            (tag, index) =>
              `${index + 1}. ${tag.trim().charAt(0).toUpperCase()}${tag
                .trim()
                .slice(1)
                .toLowerCase()}`
          )
          .join("\n");

  const isAuthor =
    article && article.author && userName === article.author.username;

  const handleDeleteArticle = async () => {
    try {
      await articlesService.deleteArticle(slug);
      navigate("/articles/page1");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className=" container ">
      <div className="article-item">
        <ArticleItem
          article={article}
          onDelete={handleDeleteArticle}
          isAuthor={isAuthor}
          slug={slug}
        ></ArticleItem>
        <div className="markdown-container">
          <ReactMarkdown children={markdownMainText}></ReactMarkdown>
          <div className="markdown-container-tags">
            <ReactMarkdown children={markdownTags}></ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
