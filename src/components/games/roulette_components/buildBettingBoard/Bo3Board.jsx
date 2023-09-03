import React from "react";
import Bo3Block from "./Bo3Block";
import styles from "../assets/styles.module.scss";

export default function Bo3Board() {
  return (
    <div className={styles["bo3_board"]}>
      {" "}
      {["1 to 12", "13 to 24", "25 to 36"].map((_, i, arr) => {
        return (
          <Bo3Block key={i} index={i}>
            {arr[i]}
          </Bo3Block>
        );
      })}
    </div>
  );
}
