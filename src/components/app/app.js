import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../header/header';
import ArticleList from '../articles-list/article-list';
import ArticleDetails from '../article-details/article-details';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import { getCookie, getUser, setUserData } from '../../redux/user-actions';
import EditProfile from '../edit-profile/edit-profile';
import CreateArticle from '../create-article/create-article';

import classes from './app.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie('token')) {
      getUser(getCookie('token')).then(({ user: { username, email, image } }) => {
        dispatch(setUserData({ username, email, image, isLogin: true }));
      });
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <main className={classes.main}>
          <Switch>
            <Route exact path={['/', '/articles']} render={() => <ArticleList />} />
            <Route exact path="/articles/:slug" render={({ match }) => <ArticleDetails slug={match.params.slug} />} />
            <Route exact path="/sign-in" render={() => <SignIn />} />
            <Route exact path="/sign-up" render={() => <SignUp />} />
            <Route exact path="/new-article" render={() => <CreateArticle />} />
            <Route
              exact
              path="/articles/:slug/edit"
              render={({ match }) => <CreateArticle edit slug={match.params.slug} />}
            />
            <Route exact path="/profile" render={() => <EditProfile />} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
