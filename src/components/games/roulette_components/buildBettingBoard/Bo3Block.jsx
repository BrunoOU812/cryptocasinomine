import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Bo3Block(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, bo3Play } = useCasino();
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
      style={{ width: "168px" }}
      className={styles["bo3_block"]}
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        bo3Play.current[`DOZEN_${props.index}`] = chipValue.current;
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        bo3Play.current[`DOZEN_${props.index}`] = chipValue.current;
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
