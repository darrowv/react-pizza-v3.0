import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено :(</h1>
      <p className={styles.description}>К сожалению у нас нет такой страницы</p>
    </div>
  );
};

export default NotFoundBlock;
