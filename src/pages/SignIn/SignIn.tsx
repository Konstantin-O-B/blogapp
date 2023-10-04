/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { schemaSignIn } from '../../lib/validation/validation';
import { setItemToLS } from '../../services/serviceLS';
import BASE_URL from '../../services/servicesAPI/constants';
import { getUser, postResources } from '../../services/servicesAPI/serviceAPI';
import { setUser } from '../../store/blogUserSlice';

import styles from './SignIn.module.css';

import handlingError from '../../lib/error';

type FormData = {
  email: string;
  password: string;
};

function SignIn() {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', resolver: yupResolver<FormData>(schemaSignIn) });
  const onSubmitSignIn = (data: { email: string; password: string }) => {
    const newURL = new URL(`${BASE_URL}/users/login`);
    postResources(newURL.toString(), { user: data })
      .then((user) => {
        const newURL = new URL(`${BASE_URL}/user`);
        getUser(newURL.toString(), user.user.token).then((user) => {
          setItemToLS('user', JSON.stringify(user))
          dispatch(setUser(user));
          history('/');
        });
      })
      .catch((error) => {
        handlingError(error)
      });
  };
  return (
    <div className={styles.signIn_container}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit(onSubmitSignIn)}>
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
            placeholder="Введите пароль"
            style={errors.password && { border: '2px solid red' }}
            type="password"
          />
          <div>{errors?.password && <span>{errors?.password.message}</span>}</div>
        </label>
        <input type="submit" value="Войти" className={styles.signInButton} />
      </form>
    </div>
  );
}
export default SignIn;
