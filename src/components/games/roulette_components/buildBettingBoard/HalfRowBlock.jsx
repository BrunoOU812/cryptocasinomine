import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";
export default function HalfRowBlock(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, ttbbetPlay } = useCasino();
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
      style={{ top: "5px" }}
      className={styles[`ttbbetblock`]}
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        ttbbetPlay.current[`HALFROW_${props.index}`] = chipValue.current;
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        ttbbetPlay.current[`HALFROW_${props.index}`] = chipValue.current;
      }}
    >
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
