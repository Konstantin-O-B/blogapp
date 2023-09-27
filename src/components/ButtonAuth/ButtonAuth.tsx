/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { exitUser } from '../../store/blogUserSlice';

import styles from './ButtonAuth.module.css';

interface Props {
  user: {
    email?: string;
    username?: string;
    bio?: string;
    image?: string | null;
    password?: string;
  };
}

const ButtonAuth: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      'https://thumbnailer.mixcloud.com/unsafe/900x900/extaudio/4/e/e/1/f21d-5069-4435-9590-4d68d8023498';
  };
  return (
    <div className={styles.buttonAuth_container}>
      <Link to="new-article">
        <button type="button" className={styles.buttonAuth_create}>
          + Создать
        </button>
      </Link>
      <Link to="/profile">
        <div className={styles.buttonAuth_user}>
          <span>{user.username}</span>
          <img src={`${user.image}`} alt="userimage" onError={handleOnError} />
        </div>
      </Link>
      <button type="button" className={styles.buttonAuth_exit} onClick={() => dispatch(exitUser())}>
        Выйти
      </button>
    </div>
  );
};

export default ButtonAuth;
