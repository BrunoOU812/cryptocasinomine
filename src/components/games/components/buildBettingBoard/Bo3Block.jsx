import React, { useEffect, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Bo3Block(props) {
  const [chip, setChip] = useState(false);
  const [chipValue, setChipValue] = useState(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, setBo3Play } = useCasino();
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
      className={styles["bo3_block"]}
      onClick={() => {
        setBet({ chip: chip, setChip: setChip, setChipValue: setChipValue });
        setBo3Play((prevState) => ({
          ...prevState,
          [`DOZEN_${props.index}`]: chipValue,
        }));
      }}
      onContextMenu={(e) => {
        removeBet({
          e: e,
          chipValue: chipValue,
          setChipValue: setChipValue,
        });
        setBo3Play((prevState) => ({
          ...prevState,
          [`DOZEN_${props.index}`]: chipValue,
        }));
      }}
    >
      {props.children}
      {chip && (
        <div className={`${styles[`chip`]} ${styles[`${chipColour}`]}`}>
          <div className={styles["chipSpan"]}>{chipValue}</div>
        </div>
      )}
    </div>
  );
}
