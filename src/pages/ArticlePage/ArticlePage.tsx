/* eslint-disable react/function-component-definition */
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';

import Like from '../../components/Like/Like';
import Tags from '../../components/Tags/Tags';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getItemFromLS } from '../../services/serviceLS';
import BASE_URL from '../../services/servicesAPI/constants';
import { deleteArticle } from '../../services/servicesAPI/serviceAPI';
import { Article, toggleFavorited } from '../../store/blogArticleSlice';

import styles from './ArticlePage.module.css';

export interface Props {
  articles: Article[];
}

const ArticlePage: React.FC<Props> = ({ articles }) => {
  const { slug } = useParams();
  const { user } = useAppSelector((state) => state.blogUser);
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const article = articles.find((article) => article.slug === slug);
  /* console.log(article); */

  const deleteArticles = (slug: string) => {
    const newURL = new URL(`${BASE_URL}/articles/${slug}`);
    const token = getItemFromLS('tokenAPI');
    deleteArticle(newURL.toString(), token).then(() => {
      dispatch(toggleFavorited());
      history('/');
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const confirm = (e?: React.MouseEvent<HTMLElement>) => {
    /* console.log(e); */
    deleteArticles(slug!);
    message.success('Статья удалена');
  };

  const viewButtons = article?.author.username === user.username;
  if (!article) {
    return <div>Статья не найдена</div>;
  }
  return (
    <div className={styles.articlePage_container}>
      <section className={styles.button_container}>
        <button className={styles.previous2} type="button" onClick={() => history(-1)}>
          &lt; Назад
        </button>
        {viewButtons && (
          <div>
            <Popconfirm
              title="Удаление статьи"
              description="Вы уверены что хотите удалить статью?"
              onConfirm={confirm}
              okText="Удалить"
              cancelText="Отмена"
            >
              <Button danger className={styles.deleteButton}>
                Удалить
              </Button>
            </Popconfirm>
            <button type="button" className={styles.editButton}>
              <Link to={`/articles/${article.slug}/edit`}>Редактировать</Link>
            </button>
          </div>
        )}
      </section>
      <div className={styles.article_container}>
        <section className={styles.article_container__article}>
          <h1>
            <a href="#/">{article.title}</a>
          </h1>
          <div className={styles.tags_container}>
            <Tags tags={article.tagList} />
          </div>
          <span>{article.description}</span>
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
      <div className={styles.markdown}>
        <Markdown>{article.body}</Markdown>
      </div>
    </div>
  );
};

export default ArticlePage;
