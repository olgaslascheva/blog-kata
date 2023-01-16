import React, { useState } from 'react';
import { format } from 'date-fns';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getArticle } from '../../redux/articles-actions';
import { favoriteArticle, unFavoriteArticle } from '../../services/services';
import { getCookie } from '../../redux/user-actions';

import classes from './article-card.module.scss';

const ArticleCard = ({ articleData, isLogin }) => {
  const [ellipsis] = useState(true);
  const { Paragraph } = Typography;
  const token = getCookie('token');

  const { title, favoritesCount, tagList, author, updatedAt, description, slug, favorited } = articleData;
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [like, setLike] = useState(favorited);

  const onLikeChange = () => {
    if (!like) {
      favoriteArticle(slug, token).then(({ article: { favorited, favoritesCount } }) => {
        setLike(favorited);
        setLikesCount(favoritesCount);
      });
    } else {
      unFavoriteArticle(slug, token).then(({ article: { favorited, favoritesCount } }) => {
        setLike(favorited);
        setLikesCount(favoritesCount);
      });
    }
  };

  return (
    <div className={classes['article-list-item']}>
      <header className={classes['article-list-item__header']}>
        <div className={classes['article-list-item__left']}>
          <div className={classes['article-list-item__title-container']}>
            <Link className={classes['article-list-item__title']} to={`articles/${slug}`}>
              {title}
            </Link>
            <div className={classes['article-list-item__likes']}>
              <label>
                <input
                  type="checkbox"
                  className={classes['article-list-item__input']}
                  disabled={!isLogin}
                  onChange={onLikeChange}
                  checked={like}
                />
                <span className={classes['article-list-item__box']}></span>
                {likesCount}
              </label>
            </div>
          </div>
          <div className={classes['article-list-item__tags']}>
            {tagList.length ? tagList.map((el, index) => <Tag key={index}>{el}</Tag>) : null}
          </div>
        </div>
        <div className={classes['article-list-item__right']}>
          <div className={classes['article-list-item__user']}>
            <h3 className={classes['article-list-item__user-name']}>{author.username}</h3>
            <span className={classes['article-list-item__date']}>{format(new Date(updatedAt), 'MMMM d, y')}</span>
          </div>
          {author.image ? <Avatar size={46} src={author.image} /> : <Avatar size={46} icon={<UserOutlined />} />}
        </div>
      </header>
      <main className={classes['article-list-item__main']}>
        <Paragraph ellipsis={ellipsis ? { rows: 2 } : false}>{description}</Paragraph>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentArticle: state.articles.currentArticle,
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: (s) => dispatch(getArticle(s)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);
