import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function OtoBlock(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, otoPlay } = useCasino();
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
      style={{ width: "126.5px" }}
      className={`${styles[props.className1]} ${styles[props.className2]}`}
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        otoPlay.current[props.type] = chipValue.current;
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        otoPlay.current[props.type] = chipValue.current;
      }}
    >
      {props.type}
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
