import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { deleteCookie, setUserData } from '../../redux/user-actions';

import classes from './header.module.scss';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const username = useSelector((state) => state.user.username);
  const image = useSelector((state) => state.user.image);

  const onLogOut = () => {
    dispatch(setUserData({ username: null, email: null, image: null, isLogin: false }));
    deleteCookie('token');
    history.push('/');
  };

  const isLogInFalse = (
    <>
      <Link to="/sign-in">
        <button className={classes['authentication__in']}>Sign in</button>
      </Link>
      <Link to="/sign-up">
        <button className={classes['authentication__up']}>Sign up</button>
      </Link>
    </>
  );

  const isLogInTrue = (
    <>
      <Link to="/new-article">
        <button className={classes['authentication__create-article']}>Create article</button>
      </Link>
      <Link to="/profile" className={classes.user}>
        {username}
        {image ? <Avatar size={46} src={image} /> : <Avatar size={46} icon={<UserOutlined />} />}
      </Link>
      <button className={classes['authentication__out']} onClick={onLogOut}>
        Log Out
      </button>
    </>
  );

  return (
    <header className={classes.header}>
      <Link to="/articles" className={classes['header__title']}>
        Realworld Blog
      </Link>
      <div className={classes.authentication}>{isLogin ? isLogInTrue : isLogInFalse}</div>
    </header>
  );
};

export default withRouter(Header);
