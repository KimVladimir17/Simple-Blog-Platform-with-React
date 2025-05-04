import { useState } from "react";
import { useNavigate } from "react-router-dom";
import articlesService from "../service/articles/articlesService";
import ArticleForm from "../components/ArticleForm";

const CreateNewArticle = () => {
  const [inputError, setInputError] = useState(null);
  const navigate = useNavigate();
  const handleCreateArticle = async (articleData) => {
    try {
      await articlesService.createArticle(articleData);
      navigate("/");
    } catch (error) {
      console.error("Error checking title uniqueness:", error);
    }
  };
  return (
    <ArticleForm
      onSubmit={handleCreateArticle}
      buttonText="Create new article"
      inputError={inputError}
      setInputError={setInputError}
    />
  );
};

export default CreateNewArticle;
