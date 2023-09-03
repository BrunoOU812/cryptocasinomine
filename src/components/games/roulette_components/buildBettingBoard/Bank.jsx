import React from "react";
import styles from "../assets/styles.module.scss";
export default function Bank(props) {
  return (
    <div className={styles["bank"]} style={{ width: "145px", height: "40px" }}>
      {props.children}
    </div>
  );
}
