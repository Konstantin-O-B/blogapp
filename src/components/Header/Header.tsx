/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentPage, setOffset } from '../../store/blogArticleSlice';
import Button from '../Button/Button';
import ButtonAuth from '../ButtonAuth/ButtonAuth';
import Loader from '../Loader/Loader';

import styles from './Header.module.css';

interface Props {
  loader: boolean;
  status: string;
}

const Header: React.FC<Props> = ({ loader }) => {
const { user } = useAppSelector((state) => state.blogUser);
const dispatch = useAppDispatch();

const redirectFirstPage = () => {
  dispatch(setCurrentPage(1));
  dispatch(setOffset(0));
}

useEffect(() => {
  redirectFirstPage();
}, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Link to="/" className={styles.header_logo} onClick={redirectFirstPage}>
          RealWorld Blog
        </Link>
        <div className={styles.header_loader}>{loader && <Loader />}</div>
        <div className={styles.header_container__buttons}>{user.token ? <ButtonAuth user={user} /> : <Button />}</div>
      </div>
    </header>
  );
};

export default Header;
