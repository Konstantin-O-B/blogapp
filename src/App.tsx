/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ArticleList from './components/ArticleList/ArticleList';
import Header from './components/Header/Header';
import { getArticles } from './services/servicesAPI/serviceAPI';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { addArticles, toggleLoader } from './store/blogArticleSlice';
import BASE_URL from './services/servicesAPI/constants';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import EditProfile from './pages/EditProfile/EditProfile';
import CreateNewArticle from './pages/CreateNewArticle/CreateNewArticle';
import EditArticle from './pages/EditArticle/EditArticle';
import RequireAuth from './hoc/RequireAuth';
import { ToastContainer } from 'react-toastify';
import handlingError from './lib/error';

function App() {
  const { articles, loader, limitArticles, offset, favorited, status } = useAppSelector((state) => state.blogArticle);
  const { user } = useAppSelector((state) => state.blogUser)
  const dispatch = useAppDispatch();
  const token = user.token;

  const getArticlesData = () => {
    const newURL = new URL(`${BASE_URL}/articles`);
    if (offset !== 0) {
      newURL.searchParams.append('offset', offset.toString());
    }
    newURL.searchParams.append('limit', limitArticles.toString());
    return getArticles(newURL.toString(), token).then((articles) => {
      dispatch(addArticles(articles));
      dispatch(toggleLoader(false));
    });
  };

  const fetchData = () => {
    dispatch(toggleLoader(true));
    getArticlesData()
    .catch((error) => {
      handlingError(error)});
  };

  useEffect(fetchData, [offset, favorited, token, user]);

  return (
    <div className="App">
      <Header loader={loader} status={status} />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage articles={articles} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <CreateNewArticle article={undefined} />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <RequireAuth>
              <EditArticle articles={articles} />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={6}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{top: '5em'}}
      />
    </div>
  );
}

export default App;
