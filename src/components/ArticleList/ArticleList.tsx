/* eslint-disable react/function-component-definition */
import { Alert, Pagination } from 'antd';
import React from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentPage, setOffset } from '../../store/blogArticleSlice';
import ArticleItem from '../ArticleItem/ArticleItem';

import styles from './ArticleList.module.css';

const ArticleList: React.FC = () => {
  const { articlesCount, currentPage, limitArticles, articles, loader } = useAppSelector((state) => state.blogArticle);
  const dispatch = useAppDispatch();

  function slidePage(page: number) {
    dispatch(setCurrentPage(page));
    dispatch(setOffset(limitArticles * (page - 1)));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  if (articles.length === 0 && !loader) {
    return (
      <Alert
        message="Внимание"
        description="Список статей отсутствует"
        type="warning"
        showIcon
        closable
        style={{ margin: '1em', width: '50%' }}
      />
    );
  }
  return (
    <>
      <ul className={styles}>
        <ArticleItem />
      </ul>
      <Pagination
        defaultCurrent={currentPage || 1}
        total={articlesCount}
        className="pagination"
        onChange={(e) => slidePage(e)}
        showSizeChanger={false}
        pageSize={5}
      />
    </>
  );
};

export default ArticleList;
