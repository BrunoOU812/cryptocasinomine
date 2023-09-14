import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function NumberBlock(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, ttbPlay, eachPlay } = useCasino();
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
      style={
        !(props.nbClass === "tt1_block")
          ? {
              width: "41.79px",
              height: "91.4px",
            }
          : {
              height: "91.4px",
              display: "flex",
              alignItems: "center",
              fontSize: "1px",
              fontWeight: "regular",
            }
      }
      className={`${props.className1} ${props.className2}`}
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        props.nbClass === "tt1_block"
          ? (ttbPlay.current[`COLUMN_${props.ttbIndex}`] = chipValue.current)
          : (eachPlay.current[`EACH_${props.num}`] = chipValue.current);
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        props.nbClass === "tt1_block"
          ? (ttbPlay.current[`COLUMN_${props.ttbIndex}`] = chipValue.current)
          : (eachPlay.current[`EACH_${props.num}`] = chipValue.current);
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
