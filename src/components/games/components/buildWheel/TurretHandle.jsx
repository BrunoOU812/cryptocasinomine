import React from "react";
import styles from "../assets/styles.module.scss";

export default function TurretHandle() {
  return (
    <div className={styles["turretHandle"]}>
      <div className={styles["thendOne"]}></div>
      <div className={styles["thendTwo"]}></div>
    </div>
  );
}
