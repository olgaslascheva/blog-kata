const setArticles = (articles) => ({ type: 'SET_ARTICLES', articles });
const setTotalPage = (totalPage) => ({ type: 'SET_TOTAL_PAGE', totalPage });
const setArticlesError = (payload) => ({ type: 'SET_ARTICLE_ERROR', payload });
const setLoading = (payload) => ({ type: 'SET_LOADING', payload });
export const setOffset = (offset) => ({ type: 'SET_OFFSET', offset });
export const setCurrentArticle = (article) => ({
  type: 'SET_CURRENT_ARTICLE',
  article,
});

export const getArticles = (offset) => async (dispatch) => {
  await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(setArticles(res.articles));
      dispatch(setTotalPage(res.articlesCount));
      dispatch(setLoading(false));
    })
    .catch(() => {
      dispatch(setArticlesError(true));
    });
};

export const getArticle = (slug) => async (dispatch) => {
  await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(setCurrentArticle(res.article));
      dispatch(setLoading(false));
    })
    .catch(() => {
      dispatch(setArticlesError(true));
    });
};
