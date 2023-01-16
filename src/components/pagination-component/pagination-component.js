import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

import { getArticles, setOffset } from '../../redux/articles-actions';
import { getCookie } from '../../redux/user-actions';

import classes from './pagination-component.module.scss';

const PaginationComponent = ({ totalPage, offset, setOffset, getArticles }) => {
  const [current, setCurrent] = useState(1);
  const token = getCookie('token');

  useEffect(() => {
    getArticles(offset, token);
  }, [offset, getArticles]);

  const onPaginationChange = (page) => {
    setCurrent(page);
    setOffset((page - 1) * 20);
  };

  return (
    <div className={classes.pagination}>
      <Pagination
        current={current}
        onChange={(p) => onPaginationChange(p)}
        total={totalPage}
        showSizeChanger={false}
        defaultPageSize={20}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    totalPage: state.articles.totalPage,
    offset: state.articles.offset,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOffset: (num) => dispatch(setOffset(num)),
    getArticles: (offset, token) => dispatch(getArticles(offset, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
