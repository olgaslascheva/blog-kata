import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import ArticleCard from '../article-card/article-card';
import { getArticles } from '../../redux/articles-actions';
import PaginationComponent from '../pagination-component/pagination-component';
import { getCookie } from '../../redux/user-actions';

import classes from './article-list.module.scss';

const ArticleList = ({ articles, getArticles, loading, currentArticle, offset }) => {
  const token = getCookie('token');

  useEffect(() => {
    getArticles(offset, token);
  }, [getArticles]);

  return (
    <>
      <div className={classes['article-list']}>
        {loading ? (
          <Spin size="large" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        ) : (
          articles.map((el) => {
            return <ArticleCard key={el.slug} articleData={el} currentArticle={currentArticle} />;
          })
        )}
      </div>
      <PaginationComponent />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    offset: state.articles.offset,
    currentArticle: state.articles.currentArticle,
    loading: state.articles.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (offset, token) => dispatch(getArticles(offset, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
