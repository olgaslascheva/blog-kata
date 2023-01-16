const initialState = {
  articles: [],
  totalPage: 0,
  offset: 0,
  currentArticle: {},
  loading: true,
  error: false,
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.articles };
    case 'SET_TOTAL_PAGE':
      return { ...state, totalPage: action.totalPage };
    case 'SET_OFFSET':
      return { ...state, offset: action.offset };
    case 'SET_CURRENT_ARTICLE':
      return { ...state, currentArticle: action.article };
    case 'SET_ARTICLE_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
