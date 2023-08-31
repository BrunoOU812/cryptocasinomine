import React from "react";
import Bbtoptwo from "./Bbtoptwo";
import styles from "../assets/styles.module.scss";

export default function Bbtop() {
  return (
    <div className={styles["bbtop"]}>
      {["1 to 18", "19 to 36"].map((item, i) => {
        return (
          <Bbtoptwo key={i} index={i}>
            {item}
          </Bbtoptwo>
        );
      })}
    </div>
  );
}
