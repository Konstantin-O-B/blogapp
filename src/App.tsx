/* eslint-disable consistent-return */
import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ArticleList from './components/ArticleList/ArticleList';
import Header from './components/Header/Header';
import { getUser, getArticles } from './services/servicesAPI/serviceAPI';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { addArticles, toggleLoader } from './store/blogArticleSlice';
import BASE_URL from './services/servicesAPI/constants';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import EditProfile from './pages/EditProfile/EditProfile';
import { getItemFromLS } from './services/serviceLS';
import { setUser } from './store/blogUserSlice';
import CreateNewArticle from './pages/CreateNewArticle/CreateNewArticle';
import fetchErrors from './lib/error';
import { setError } from './store/blogAppSlice';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';
import EditArticle from './pages/EditArticle/EditArticle';
import RequireAuth from './hoc/RequireAuth';

function App() {
  const { articles, loader, limitArticles, offset, favorited } = useAppSelector((state) => state.blogArticle);
  const { errors } = useAppSelector((state) => state.blogApp);
  const dispatch = useAppDispatch();

  const getUserData = () => {
    const newURL = new URL(`${BASE_URL}/user`);
    return getUser(newURL.toString(), getItemFromLS('tokenAPI')?.toString()).then((user) => {
      dispatch(setUser(user));
    });
  };

  const getArticlesData = () => {
    const newURL = new URL(`${BASE_URL}/articles`);
    if (offset !== 0) {
      newURL.searchParams.append('offset', offset.toString());
    }
    newURL.searchParams.append('limit', limitArticles.toString());
    return getArticles(newURL.toString(), getItemFromLS('tokenAPI')).then((articles) => {
      dispatch(addArticles(articles));
      dispatch(toggleLoader(false));
    });
  };

  const getArticlesDataWithoutAuth = () => {
    const newURL = new URL(`${BASE_URL}/articles`);
    if (offset !== 0) {
      newURL.searchParams.append('offset', offset.toString());
    }
    newURL.searchParams.append('limit', limitArticles.toString());
    return getArticles(newURL.toString())
      .then((articles) => {
        dispatch(addArticles(articles));
        dispatch(toggleLoader(false));
      })
      .catch((error) => {
        dispatch(setError(fetchErrors(error)));
      });
  };

  const fetchData = () => {
    dispatch(toggleLoader(true));
    if (getItemFromLS('tokenAPI')) {
      getUserData()
        .then(getArticlesData)
        .catch((error) => {
          dispatch(setError(fetchErrors(error)));
        });
    } else {
      getArticlesDataWithoutAuth();
    }
  };

  useEffect(fetchData, [offset, favorited, getItemFromLS('tokenAPI')]);

  return (
    <div className="App">
      <Header loader={loader} />
      {errors && <ErrorAlert />}
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
    </div>
  );
}

export default App;
