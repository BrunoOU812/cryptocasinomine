import React, { useEffect, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Bbtoptwo(props) {
  const [chip, setChip] = useState(false);
  const [chipValue, setChipValue] = useState(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, setHalfBoard1Play, setHalfBoard2Play } =
    useCasino();
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
      className={styles["bbtoptwo"]}
      onClick={() => {
        setBet({ chip: chip, setChip: setChip, setChipValue: setChipValue });
        props.index === 0
          ? setHalfBoard1Play((prevState) => ({
              ...prevState,
              [`HALFBOARD1_${props.index}`]: chipValue,
            }))
          : setHalfBoard2Play((prevState) => ({
              ...prevState,
              [`HALFBOARD2_${props.index}`]: chipValue,
            }));
      }}
      onContextMenu={(e) => {
        removeBet({
          e: e,
          chipValue: chipValue,
          setChipValue: setChipValue,
        });
        props.index === 0
          ? setHalfBoard1Play((prevState) => ({
              ...prevState,
              [`HALFBOARD1_${props.index}`]: chipValue,
            }))
          : setHalfBoard2Play((prevState) => ({
              ...prevState,
              [`HALFBOARD2_${props.index}`]: chipValue,
            }));
      }}
    >
      {props.children}
      {chip && (
        <div className={`${styles.chip} ${styles[chipColour]}`}>
          <div className={styles["chipSpan"]}>{chipValue}</div>
        </div>
      )}
    </div>
  );
}
