/* eslint-disable consistent-return */
import React from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
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
  const dispatch = useAppDispatch();
  const handlerClick = (slug: string) => {
    const newURL = new URL(`${BASE_URL}/articles/${slug}/favorite`);
    if (favorited) {
      return deleteFavoriteArticle(newURL.toString(), token).then(() => dispatch(toggleFavorited()));
    }
    console.log(1);
    addFavoriteArticle(newURL.toString(), token).then(() => dispatch(toggleFavorited()));
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
