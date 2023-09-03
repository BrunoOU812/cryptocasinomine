import React from "react";
import styles from "../assets/styles.module.scss";

export default function Wlcb(props) {
  return (
    <div id={styles[`wlcb_${props.index + 1}`]} className={styles[`wlcb`]}>
      {props.children}
    </div>
  );
}
