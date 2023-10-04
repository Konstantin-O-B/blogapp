/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import BASE_URL from '../../services/servicesAPI/constants';
import { getUser, postResources } from '../../services/servicesAPI/serviceAPI';
import { schemaSignUp } from '../../lib/validation/validation';
import { setUser } from '../../store/blogUserSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import styles from './CreateNewAccount.module.css';
import { setItemToLS } from '../../services/serviceLS';
import handlingError from '../../lib/error';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  agreement?: boolean;
};
function SignUp() {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver<FormData>(schemaSignUp) });
  const onSubmit = (data: {
    username: string;
    email: string;
    password: string;
    confirm_password?: string;
    agreement?: boolean;
  }) => {
    delete data.confirm_password;
    const newURL = new URL(`${BASE_URL}/users`);
    postResources(newURL.toString(), { user: data }).then((user) => {
      const newURL = new URL(`${BASE_URL}/user`);
      getUser(newURL.toString(), user.user.token).then((user) => {
        setItemToLS('user', JSON.stringify(user))
        dispatch(setUser(user));
        history('/');
      });
    }).catch((error) => {
      handlingError(error)});
  };
  return (
    <div className={styles.newAccount_container}>
      <h1>Зарегистрироваться</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Имя пользователя:
          <input
            {...register('username')}
            className="form__input"
            placeholder="Имя пользователя"
            style={errors.username && { border: '2px solid red' }}
          />
        </label>
        <div>{errors?.username && <span>{errors?.username.message}</span>}</div>
        <label>
          E-mail:
          <input
            {...register('email')}
            type="email"
            placeholder="E-mail"
            style={errors.email && { border: '2px solid red' }}
          />
          <div>{errors.email && <span>{errors?.email.message}</span>}</div>
        </label>
        <label>
          Пароль:
          <input
            {...register('password')}
            placeholder="Придумайте пароль"
            style={errors.password && { border: '2px solid red' }}
            type="password"
          />
          <div>{errors?.password && <span>{errors?.password.message}</span>}</div>
        </label>
        <label>
          Повторите пароль:
          <input
            {...register('confirm_password')}
            placeholder="Повторите пароль"
            style={errors.confirm_password && { border: '2px solid red' }}
            type="password"
          />
          <div>{errors?.confirm_password && <span>{errors?.confirm_password.message}</span>}</div>
        </label>
        <label className={styles.personalInfo}>
          <input type="checkbox" {...register('agreement')} style={errors.agreement && { border: '2px solid red' }} />Я
          согласен с обработкой моих персональных данных
        </label>
        <div>{errors?.agreement && <span>{errors?.agreement.message}</span>}</div>
        <input type="submit" value="Зарегистрироваться" className={styles.signUpButton} />
        <p>
          Уже зарегистрированы? <Link to="/sign-in">Войти</Link>
        </p>
      </form>
    </div>
  );
}
export default SignUp;
