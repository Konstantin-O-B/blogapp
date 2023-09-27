/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { schemaEditProfile } from '../../lib/validation/validation';
import { getItemFromLS } from '../../services/serviceLS';
import BASE_URL from '../../services/servicesAPI/constants';
import { putResources } from '../../services/servicesAPI/serviceAPI';
import { toggleFavorited } from '../../store/blogArticleSlice';

import styles from './EditProfile.module.css';

type FormData = {
  username?: string | null;
  email?: string;
  password?: string;
  image?: string;
};

function EditProfile() {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver<FormData>(schemaEditProfile) });
  const onSubmit = (data: FormData) => {
    /* console.log(data); */
    const newURL = new URL(`${BASE_URL}/user`);
    const token = getItemFromLS('tokenAPI');
    putResources(newURL.toString(), { user: data }, token?.toString()).then(() => {
      dispatch(toggleFavorited());
      history('/');
    });
  };
  return (
    <div className={styles.editProfile_container}>
      <h1>Редактирование профиля</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Имя пользователя:
          <input
            {...register('username')}
            type="text"
            className="form__input"
            placeholder="Имя пользователя"
            style={errors.username && { border: '2px solid red' }}
          />
          <div>{errors.username && <span>{errors?.username.message}</span>}</div>
        </label>
        <label>
          E-mail:
          <input
            {...register('email')}
            type="email"
            placeholder="Введите новый E-mail"
            style={errors.email && { border: '2px solid red' }}
          />
          <div>{errors.email && <span>{errors?.email.message}</span>}</div>
        </label>
        <label>
          Новый пароль:
          <input
            {...register('password')}
            placeholder="Введите новый пароль"
            style={errors.password && { border: '2px solid red' }}
            type="password"
          />
          <div>{errors?.password && <span>{errors?.password.message}</span>}</div>
        </label>
        <label>
          Изображение профиля(путь):
          <input
            {...register('image')}
            placeholder="Ссылка на изображение"
            style={errors.image && { border: '2px solid red' }}
            type="text"
          />
          <div>{errors?.image && <span>{errors?.image.message}</span>}</div>
        </label>
        <div className={styles.editButton_container}>
          <input type="submit" value="Сохранить" className={styles.editButton} />
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
