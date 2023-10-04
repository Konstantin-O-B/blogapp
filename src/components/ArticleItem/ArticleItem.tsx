/* eslint-disable indent */
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import Tags from '../Tags/Tags';
import limitCharacters from '../../lib/limitCharacters';
import Like from '../Like/Like';
import { getItemFromLS } from '../../services/serviceLS';

import styles from './ArticleItem.module.css';

function ArticleItem() {
  const { articles } = useAppSelector((state) => state.blogArticle);
  /* console.log(articles); */
  return (
    <>
      {articles.map((article) => (
        <li key={article.slug}>
          <div className={styles.article_container}>
            <section className={styles.article_container__article}>
              <div className={styles.article_container__title}>
                <h1>
                  <Link to={`/articles/${article.slug}`}>{limitCharacters(article.title, 50)}</Link>
                </h1>
              </div>
              <div className={styles.tags_container}>
                <Tags tags={article.tagList} />
              </div>
              <span>{limitCharacters(article.description, 300)}</span>
            </section>
            <section className={styles.article_container__user}>
              <div className={styles.user_nameAndDate}>
                <span>{article.author.username}</span>
                <span>{format(new Date(article.createdAt), 'PP')}</span>
                <Like
                  favorited={article.favorited}
                  favoritesCount={article.favoritesCount}
                  slug={article.slug}
                  token={getItemFromLS('tokenAPI')}
                />
              </div>
              <img src={article.author.image} alt="user_image" />
            </section>
          </div>
        </li>
      ))}
    </>
  );
}
export default ArticleItem;
