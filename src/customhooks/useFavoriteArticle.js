import articlesService from "../services/articles/articlesService";

const favoriteToggle = async (isAuthenticated, updateStatusList) => {
  setTimeout(async () => {
    if (!isAuthenticated) return;
    const promises = Object.entries(updateStatusList).map(([slug, status]) =>
      status
        ? articlesService.favoriteArticle(slug)
        : articlesService.unFavoriteArticle(slug)
    );
    try {
      await Promise.all(promises);
    } catch (err) {
      console.error("Ошибка при отправке изменений:", err);
    }
  }, 500);
};

export default favoriteToggle;
