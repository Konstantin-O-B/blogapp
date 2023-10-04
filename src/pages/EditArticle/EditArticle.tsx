/* eslint-disable react/function-component-definition */
import React from 'react';
import { useParams } from 'react-router';

import { Props } from '../ArticlePage/ArticlePage';
import CreateNewArticle from '../CreateNewArticle/CreateNewArticle';

const EditArticle: React.FC<Props> = ({ articles }) => {
  const { slug } = useParams();
  const article = articles.find((article) => article.slug === slug);
  /* console.log(article); */
  return <CreateNewArticle article={article} />;
};
export default EditArticle;
