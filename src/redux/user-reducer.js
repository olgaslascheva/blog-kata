const initialState = {
  isLogin: false,
  username: '',
  email: '',
  image: '',
  error: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, ...action.payload };
    case 'SET_USER_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
