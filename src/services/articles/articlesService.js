import { axiosInstance } from "../../plugins/axios-plugin";

const articlesService = {
  getArticles: async (articlesPerPage, currentPage) => {
    try {
      const response = await axiosInstance.get("/articles", {
        params: {
          limit: articlesPerPage,
          offset: (currentPage - 1) * articlesPerPage,
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  getArticleBySlug: async (slug) => {
    try {
      const response = await axiosInstance.get(`/articles/${slug}`);
      return response.data.article;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },

  createArticle: async (articleData) => {
    try {
      const response = await axiosInstance.post("/articles", {
        article: { ...articleData },
      });
      return response.data.article;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  deleteArticle: async (slug) => {
    try {
      await axiosInstance.delete(`/articles/${slug}`);
    } catch (error) {
      console.log("error");
      throw error;
    }
  },
  isTitleUnique: async (title, currentSlug = "") => {
    try {
      const response = await axiosInstance.get(`/articles`);
      const found = response.data.articles.some(
        (article) => article.title === title && article.slug !== currentSlug
      );
      return !found;
    } catch (error) {
      console.error("Error checking title uniqueness:", error);
      return false;
    }
  },
  favoriteArticle: async (slug) => {
    const res = await axiosInstance.post(`/articles/${slug}/favorite`);
    return res.data.article;
  },
  unFavoriteArticle: async (slug) => {
    const res = await axiosInstance.delete(`/articles/${slug}/favorite`);
    return res.data.article;
  },
};

export default articlesService;
