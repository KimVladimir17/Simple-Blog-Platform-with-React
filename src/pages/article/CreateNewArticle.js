import { useNavigate, useOutletContext } from "react-router-dom";
import articlesService from "../../services/articles/articlesService";
import ArticleForm from "../article/components/ArticleForm";

const CreateNewArticle = () => {
  const { setCurrentPage } = useOutletContext();
  const navigate = useNavigate();
  const handleCreateArticle = async (articleData) => {
    try {
      await articlesService.createArticle(articleData);
      setCurrentPage(1);
      navigate(`/articles/page${1}`);
    } catch (error) {
      console.error("Error checking title uniqueness:", error);
    }
  };
  return (
    <ArticleForm
      onSubmit={handleCreateArticle}
      buttonText="Create new article"
    />
  );
};

export default CreateNewArticle;
