import React from "react";
import styles from "../assets/styles.module.scss";
export default function Bet(props) {
  return (
    <div className={styles["bet"]} style={{ width: "145px", height: "40px" }}>
      {props.children}
    </div>
  );
}
