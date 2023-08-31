import React from "react";
import styles from "../assets/styles.module.scss";

export default function Wlrtl(props) {
  return (
    <div id={props.id} className={styles["wlrtl"]}>
      {props.children}
    </div>
  );
}
