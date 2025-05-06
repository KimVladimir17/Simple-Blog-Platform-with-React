import { useCallback } from "react";
import articlesService from "../../service/articles/articlesService";

export const useFavoriteToggle = (setArticles) => {
  const handleFavoriteToggle = useCallback(
    async (slug, newFavoriteStatus) => {
      try {
        const updatedArticle = newFavoriteStatus
          ? await articlesService.favoriteArticle(slug)
          : await articlesService.unFavoriteArticle(slug);

        setArticles((prevArticles) =>
          Array.isArray(prevArticles)
            ? prevArticles.map((article) =>
                article.slug === slug ? updatedArticle : article
              )
            : setArticles(updatedArticle)
        );
      } catch (error) {
        console.error("Ошибка при переключении избранного:", error);
      }
    },
    [setArticles]
  );

  return handleFavoriteToggle;
};
