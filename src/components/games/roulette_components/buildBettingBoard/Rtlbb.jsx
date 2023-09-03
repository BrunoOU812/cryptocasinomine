import React, { useEffect, useRef, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Rtlbb(props) {
  const [chip, setChip] = useState(false);
  const chipValue = useRef(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, halfV1Play, halfV2Play, halfV3Play } =
    useCasino();
  const sethalfVPlay = {
    1: halfV1Play,
    2: halfV2Play,
    3: halfV3Play,
  };
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
      style={{
        height: "53px",
        display: "flex",
        alignItems: "center",
      }}
      className={styles[`rtlbb${props.index + 1}`]}
      onClick={() => {
        setBet({ chip, setChip, chipValue });
        sethalfVPlay[`${props.index + 1}`].current[
          `HALFV${props.index + 1}_${props.compIndex}`
        ] = chipValue.current;
      }}
      onContextMenu={(e) => {
        removeBet({ e, chipValue });
        sethalfVPlay[`${props.index + 1}`].current[
          `HALFV${props.index + 1}_${props.compIndex}`
        ] = chipValue.current;
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
