import React from "react";

import styles from "./Card.module.scss";

const Card = () => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__header"]}>
        <span className={styles["card__header__1"]}>Form name</span>
        <span className={styles["card__header__2"]}>Last edited</span>
        <span className={styles["card__header__3"]}>Notes</span>
        <span className={styles["card__header__3"]}>Action</span>
      </div>
    </div>
  );
};

export default Card;
