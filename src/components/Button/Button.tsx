import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';

import styles from './Button.module.css';

function Button() {
  const { buttons } = useAppSelector((state) => state.blogApp);
  return (
    <>
      {buttons.map((button) => (
        <Link to={`/${button.link}`} key={button.id}>
          <button type="button" className={styles.button}>
            {button.text}
          </button>
        </Link>
      ))}
    </>
  );
}

export default Button;
