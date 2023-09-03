import React, { useState } from "react";
import styles from "../assets/styles.module.scss";
import { useCasino } from "../Context";

export default function CdChip(props) {
  const {
    chipActive,
    setChipActive,
    currentBet,
    setWager,
    setBankValue,
    setCurrentBet,
    clearBet,
    spin,
  } = useCasino();
  const i = props.index;
  let cvi = i;
  const arr = props.arr;
  return (
    <div
      style={{ width: "37px", height: "37px" }}
      className={`${styles[props.className1]} ${styles[props.className2]} ${
        chipActive[i] && styles["cdChipActive"]
      }`}
      onClick={() => {
        if (!spin) {
          if (cvi !== 4) {
            const updateActiveChips = chipActive.map((_, j) =>
              j === i ? true : false
            );
            setChipActive(updateActiveChips);
            setWager(arr[i]);
          } else {
            setBankValue((prevState) => prevState + currentBet);
            setCurrentBet(0);
            clearBet(true);
          }
        }
      }}
    >
      {props.children}
    </div>
  );
}
