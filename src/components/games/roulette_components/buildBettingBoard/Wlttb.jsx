import React from "react";
import styles from "../assets/styles.module.scss";

export default function Wlttb(props) {
  return (
    <div id={props.id} className={styles["wlttb"]}>
      {props.children}
    </div>
  );
}
