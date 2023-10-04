/* eslint-disable react/function-component-definition */
import React from 'react';
import limitCharacters from '../../lib/limitCharacters';

import styles from './Tags.module.css';

interface Props {
  tags: string[];
}


const Tags: React.FC<Props> = ({ tags }) => (
  <div className={styles.tags_container}>
    {tags.map((tag) => (
      <button key={Date.now() + Math.random()} type="button" className={styles.tag}>
        {limitCharacters(tag?.trim(), 15)}
      </button>
    ))}
  </div>
);

export default Tags;
