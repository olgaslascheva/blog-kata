const setArticles = (articles) => ({ type: 'SET_ARTICLES', articles });
const setTotalPage = (totalPage) => ({ type: 'SET_TOTAL_PAGE', totalPage });
const setArticlesError = (payload) => ({ type: 'SET_ARTICLE_ERROR', payload });
const setLoading = (payload) => ({ type: 'SET_LOADING', payload });
export const setOffset = (offset) => ({ type: 'SET_OFFSET', offset });
export const setCurrentArticle = (article) => ({
  type: 'SET_CURRENT_ARTICLE',
  article,
});

export const getArticles = (offset, token) => async (dispatch) => {
  await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
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

export const getArticle = (slug, token) => async (dispatch) => {
  await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
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
