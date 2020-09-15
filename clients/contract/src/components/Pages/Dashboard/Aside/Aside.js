import React from "react";

import styles from "./Aside.module.scss";

const Aside = () => {
  return (
    <div className={styles["aside"]}>
      <div className={styles["aside__avatar"]}>
        <i class="far fa-user-circle"></i>
        <i class="fas fa-plus-square"></i>
      </div>
      <div className={styles["aside__employee"]}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Position" />
      </div>
      <div className={styles["aside__formCtl"]}>
        <div className="">
          <i class="far fa-envelope"></i>
        </div>
        <input type="text" placeholder="Email" />
      </div>
      <div className={styles["aside__formCtl"]}>
        <div className="">
          <i class="fas fa-mobile-alt"></i>
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className={styles["aside__formCtl"]}>
        <div className="">
          <i class="fas fa-project-diagram"></i>
        </div>
        <textarea placeholder="Team"></textarea>
      </div>

      <textarea
        className={styles["aside__notes"]}
        placeholder="Notes"
      ></textarea>
    </div>
  );
};

export default Aside;
