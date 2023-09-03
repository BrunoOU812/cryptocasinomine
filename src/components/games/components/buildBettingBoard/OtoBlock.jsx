import React, { useEffect, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function OtoBlock(props) {
  const [chip, setChip] = useState(false);
  const [chipValue, setChipValue] = useState(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, setOtoPlay } = useCasino();
  useEffect(() => {
    chipValue >= 100
      ? setChipColour("gold")
      : chipValue >= 10
      ? setChipColour("orange")
      : chipValue >= 5
      ? setChipColour("blue")
      : setChipColour("red");
    if (chipValue === 0) {
      setChip(false);
    } else if (clear) {
      setChip(false);
    }
  }, [chipValue, clear]);
  return (
    <div
      className={`${styles[props.className1]} ${styles[props.className2]}`}
      onClick={() => {
        setBet({ chip, setChip, setChipValue });
        setOtoPlay((prevState) => ({
          ...prevState,
          [props.type]: chipValue,
        }));
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue, setChipValue });
        setOtoPlay((prevState) => ({
          ...prevState,
          [props.type]: chipValue,
        }));
      }}
    >
      {props.type}
      {chip && (
        <div className={`${styles[`chip`]} ${styles[chipColour]}`}>
          <div className={styles["chipSpan"]}>{chipValue}</div>
        </div>
      )}
    </div>
  );
}
