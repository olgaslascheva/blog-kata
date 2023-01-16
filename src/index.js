import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app/app';
import { articlesReducer } from './redux/articles-reducer';
import { userReducer } from './redux/user-reducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
