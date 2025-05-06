import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { useEffect, useState } from "react";
import articlesService from "../service/articles/articlesService";
import { setLoader } from "../service/api/axios-plugin";
const EditArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await articlesService.getArticleBySlug(slug);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle();
  }, [slug]);

  const handleEditArticle = async (articleData) => {
    try {
      await articlesService.deleteArticle(slug);
      const response = await articlesService.createArticle(articleData);
      navigate(`/articles/${response.slug}`);
    } catch (error) {
      console.error("Error checking title uniqueness:", error);
    }
  };
  return <ArticleForm initialValues={article} onSubmit={handleEditArticle} />;
};

export default EditArticle;
