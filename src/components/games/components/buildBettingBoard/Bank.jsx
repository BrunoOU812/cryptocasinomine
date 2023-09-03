import React from "react";
import styles from "../assets/styles.module.scss";
export default function Bank(props) {
  return <div className={styles["bank"]}>{props.children}</div>;
}
