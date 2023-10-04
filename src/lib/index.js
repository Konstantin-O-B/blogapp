/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { Pagination } from 'antd';

import getResources from '../services/servicesAPI/serviceAPI';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { addArticles, toggleLoader, setCurrentPage, setOffset } from '../store/blogArticleSlice';
import BASE_URL from '../services/servicesAPI/constants';

let imports = {};

export default imports = {
  useEffect,
  Pagination,
  getResources,
  useAppDispatch,
  useAppSelector,
  addArticles,
  toggleLoader,
  setCurrentPage,
  setOffset,
  BASE_URL,
};
