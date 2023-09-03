import React from "react";
import styles from "../assets/styles.module.scss";
export default function ChipSpan(props) {
  return <div className={styles["cdChipSpan"]}>{props.children}</div>;
}
