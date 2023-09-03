import React from "react";
import CdChip from "./CdChip";
import ChipSpan from "./ChipSpan";
import styles from "../assets/styles.module.scss";

export default function ChipDeck(props) {
  return (
    <div className={styles["chipDeck"]} style={{ height: "43px" }}>
      {[1, 5, 10, 100, "clear"].map((_, i, arr) => {
        let chipColour =
          i == 0
            ? "red"
            : i == 1
            ? "blue"
            : i == 2
            ? "orange"
            : i == 3
            ? "gold"
            : "clearBet";
        return (
          <CdChip
            key={i}
            className1={`cdChip`}
            className2={`${chipColour}`}
            arr={arr}
            index={i}
          >
            <ChipSpan>{arr[i]}</ChipSpan>
          </CdChip>
        );
      })}
    </div>
  );
}
