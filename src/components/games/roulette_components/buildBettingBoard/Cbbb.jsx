import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Cbbb(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, quarter1Play, quarter2Play } = useCasino();
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
      style={{ top: "10px" }}
      id={styles[`cbbb_${props.index + 1}`]}
      className={styles[`cbbb`]}
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        props.wlcbIndex === 0
          ? (quarter1Play.current[`QUARTER1_${props.index}`] =
              chipValue.current)
          : (quarter2Play.current[`QUARTER2_${props.index}`] =
              chipValue.current);
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        props.wlcbIndex === 0
          ? (quarter1Play.current[`QUARTER1_${props.index}`] =
              chipValue.current)
          : (quarter2Play.current[`QUARTER2_${props.index}`] =
              chipValue.current);
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
