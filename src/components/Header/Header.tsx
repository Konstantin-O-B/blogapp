/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import Button from '../Button/Button';
import ButtonAuth from '../ButtonAuth/ButtonAuth';
import Loader from '../Loader/Loader';

import styles from './Header.module.css';

interface Props {
  loader: boolean;
}

const Header: React.FC<Props> = ({ loader }) => {
  const { user, isAuth } = useAppSelector((state) => state.blogUser);
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Link to="/" className={styles.header_logo}>
          RealWorld Blog
        </Link>
        <div className={styles.header_loader}>{loader && <Loader />}</div>
        <div className={styles.header_container__buttons}>{isAuth ? <ButtonAuth user={user} /> : <Button />}</div>
      </div>
    </header>
  );
};

export default Header;
