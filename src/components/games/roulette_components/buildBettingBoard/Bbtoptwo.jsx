import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Bbtoptwo(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, halfBoard1Play, halfBoard2Play } =
    useCasino();
  useEffect(() => {
    chipValue.current >= 100
      ? setChipColour("gold")
      : chipValue.current >= 10
      ? setChipColour("orange")
      : chipValue.current >= 5
      ? setChipColour("blue")
      : setChipColour("red");
    if (chipValue.current === 0) {
      setChip(false);
    } else if (clear) {
      setChip(false);
    }
  }, [chipValue.current, clear]);

  return (
    <div
      className={styles["bbtoptwo"]}
      style={{ width: "250px" }}
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        props.index === 0
          ? (halfBoard1Play.current[`HALFBOARD1_${props.index}`] =
              chipValue.current)
          : (halfBoard2Play.current[`HALFBOARD2_${props.index}`] =
              chipValue.current);
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        props.index === 0
          ? (halfBoard1Play.current[`HALFBOARD1_${props.index}`] =
              chipValue.current)
          : (halfBoard2Play.current[`HALFBOARD2_${props.index}`] =
              chipValue.current);
      }}
    >
      {props.children}
      {chip && (
        <div
          className={`${styles[`chip`]} ${styles[`${chipColour}`]}`}
          style={{ height: "27px", width: "27px" }}
        >
          <div className={styles["chipSpan"]}>{chipValue.current}</div>
        </div>
      )}
    </div>
  );
}
