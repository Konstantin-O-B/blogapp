/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { schemaCreateNewArticle } from '../../lib/validation/validation';
import { getItemFromLS } from '../../services/serviceLS';
import BASE_URL from '../../services/servicesAPI/constants';
import { editArticle, postResources } from '../../services/servicesAPI/serviceAPI';
import { toggleFavorited, Article } from '../../store/blogArticleSlice';

import styles from './CreateNewArticle.module.css';

type FormData = {
  title: string;
  description: string;
  body: string;
  tags?: { value: string }[];
};

type Props = {
  article: Article | undefined;
};

const CreateNewArticle: React.FC<Props> = ({ article }) => {
  const { body, description, slug, tagList, title } = article || {};
  /* const tags = (tagList || []).map((tag) => ({ value: tag })); */

  const [showButtonAdd, setShowButtonAdd] = useState(true);
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schemaCreateNewArticle),
    defaultValues: {
      title,
      description,
      body,
      tags: (tagList || []).map((tag) => ({ value: tag })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const isEdit = !!article;

  const onSubmit = (data: FormData) => {
    const newURL = new URL(`${BASE_URL}/articles`);
    const { tags } = data;
    const newTags = tags?.map((tag) => tag.value);
    const token = getItemFromLS('tokenAPI');
    const newData = { title: data.title, description: data.description, body: data.body, tagList: newTags };
    if (isEdit) {
      const newURL = new URL(`${BASE_URL}/articles/${slug}`);
      return editArticle(newURL.toString(), token, { article: newData }).then(() => {
        dispatch(toggleFavorited());
        history('/');
      });
    }

    postResources(newURL.toString(), { article: newData }, token).then(() => {
      dispatch(toggleFavorited());
      history('/');
    });
  };
  return (
    <div className={styles.createNewArticle_container}>
      <h1>{!isEdit ? 'Создать новую статью' : 'Редактирование статьи'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Заголовок:
          <input
            {...register('title')}
            className="form__input"
            placeholder="Введите заголовок"
            type="text"
            style={errors.title && { border: '2px solid red' }}
          />
        </label>
        <div>{errors?.title && <span>{errors?.title.message}</span>}</div>
        <label>
          Короткое описание:
          <input
            {...register('description')}
            type="text"
            placeholder="Короткое описание"
            style={errors.description && { border: '2px solid red' }}
          />
          <div>{errors.description && <span>{errors?.description.message}</span>}</div>
        </label>
        <label>
          Текст статьи:
          <textarea
            {...register('body')}
            placeholder="Напишите ваш текст.."
            style={errors.body && { border: '2px solid red' }}
            className={styles.textarea}
          />
          <div>{errors?.body && <span>{errors?.body.message}</span>}</div>
        </label>
        <div className={styles.asd}>
          <ul className={styles.li_container}>
            {fields.map((field, index) => (
              <li key={field.id} className={styles.tag_container}>
                <label /* className={`${classes.label} ${classes.tag}`} */>
                  <input
                    style={errors.tags && { border: '1px solid red' }}
                    placeholder="Tag"
                    {...register(`tags.${index}.value`)}
                  />
                  <div>{errors.tags && <span>{errors?.tags[index]?.value?.message}</span>}</div>
                </label>
                <button
                  className={styles.buttonDelete}
                  type="button"
                  onClick={() => {
                    if (fields.length === 1) {
                      remove(index);
                      setShowButtonAdd(true);
                    }
                    remove(index);
                  }}
                >
                  Удалить
                </button>
                {index === fields.length - 1 && (
                  <button className={styles.buttonAdd} type="button" onClick={() => append({ value: '' })}>
                    Добавить тег
                  </button>
                )}
              </li>
            ))}
          </ul>

          {showButtonAdd && (
            <button
              className={styles.buttonAdd}
              type="button"
              onClick={() => {
                append({ value: '' });
                setShowButtonAdd(false);
              }}
            >
              Добавить тег
            </button>
          )}
        </div>
        <div>{errors.tags && <span>{errors?.tags.message}</span>}</div>
        <div className={styles.createButton_container}>
          <input type="submit" value={!isEdit ? 'Создать' : 'Отправить'} className={styles.createButton} />
        </div>
      </form>
    </div>
  );
};
export default CreateNewArticle;
