/* eslint-disable consistent-return */
import React, { useState } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import handlingError from '../../lib/error';
import BASE_URL from '../../services/servicesAPI/constants';
import { addFavoriteArticle, deleteFavoriteArticle } from '../../services/servicesAPI/serviceAPI';
import { toggleFavorited } from '../../store/blogArticleSlice';

import styles from './Like.module.css';

type LikeProps = {
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  token: string | null;
};

function Like({ favorited, favoritesCount, slug, token }: LikeProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handlerClick = (slug: string) => {
    if (loading) {return}
    setLoading(true);
    const newURL = new URL(`${BASE_URL}/articles/${slug}/favorite`);
    if (favorited) {
      return deleteFavoriteArticle(newURL.toString(), token).then(() => {
        dispatch(toggleFavorited());
        setLoading(false);
      }).catch((error) => {
        handlingError(error)});
    }
    addFavoriteArticle(newURL.toString(), token).then(() => {
      dispatch(toggleFavorited());
      setLoading(false);
    }).catch((error) => {
      handlingError(error)});
  };
  return (
    <div className={styles.like__container}>
      <button type="submit" className={styles.like_button} onClick={() => handlerClick(slug)}>
        <span>{favorited ? '🧡' : '🤍'}</span>
      </button>
      <span>{favoritesCount}</span>
    </div>
  );
}
export default Like;
