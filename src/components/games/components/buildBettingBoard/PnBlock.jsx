import React from "react";
import PnContent from "./PnContent";
import styles from "../assets/styles.module.scss";
export default function PnBlock(props) {
  return (
    <div className={styles["pnBlock"]}>
      <PnContent />
    </div>
  );
}
