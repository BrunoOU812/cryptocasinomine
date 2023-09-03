import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Zero(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, zeroPlay } = useCasino();
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
      className="number_0"
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        zeroPlay.current[`ZERO_0`] = chipValue.current;
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        zeroPlay.current[`ZERO_0`] = chipValue.current;
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
// {chip && (
//   <div
//     className={`chip ${chipColour}`}
//     style={{ height: "27px", width: "27px" }}
//   >
//     <div className="chipSpan">{chipValue}</div>
//   </div>
// )}
