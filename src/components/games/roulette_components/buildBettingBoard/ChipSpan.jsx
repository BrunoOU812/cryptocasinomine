import React from "react";
import styles from "../assets/styles.module.scss";
export default function ChipSpan(props) {
  return (
    <div
      className={styles["cdChipSpan"]}
      style={{ width: "27px", height: "27px" }}
    >
      {props.children}
    </div>
  );
}
