import React from "react";
import OtoBlock from "./OtoBlock";
import styles from "../assets/styles.module.scss";

export default function OtoBoard() {
  return (
    <div className={styles["oto_board"]}>
      {["EVEN", "RED", "BLACK", "ODD"].map((_, i, arr) => {
        let colourClass =
          arr[i] == "RED" ? "redNum" : arr[i] == "BLACK" ? "blackNum" : "";
        return (
          <OtoBlock
            key={i}
            className1={`oto_block`}
            className2={`${colourClass}`}
            type={arr[i]}
          />
        );
      })}
    </div>
  );
}
