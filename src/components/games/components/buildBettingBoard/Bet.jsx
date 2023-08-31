import React from "react";
import styles from "../assets/styles.module.scss";
export default function Bet(props) {
  return <div className={styles["bet"]}>{props.children}</div>;
}
