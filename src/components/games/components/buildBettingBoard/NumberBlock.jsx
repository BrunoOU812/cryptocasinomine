import React, { useEffect, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function NumberBlock(props) {
  const [chip, setChip] = useState(false);
  const [chipValue, setChipValue] = useState(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, setTtbPlay, setEachPlay } = useCasino();
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
  const combinedStyles = [
    styles[props.className1],
    styles[props.className2],
  ].join(" ");

  return (
    <div
      // className={`${styles[props.className1]} ${styles[props.className2]}`}
      className={`${props.className1} ${props.className2}`}
      onClick={() => {
        setBet({ chip: chip, setChip: setChip, setChipValue: setChipValue });
        props.className === "tt1_block"
          ? setTtbPlay((prevState) => ({
              ...prevState,
              [`COLUMN_${props.ttbIndex}`]: chipValue,
            }))
          : setEachPlay((prevState) => ({
              ...prevState,
              [`EACH_${props.num}`]: chipValue,
            }));
      }}
      onContextMenu={(e) => {
        removeBet({
          e: e,
          chipValue: chipValue,
          setChipValue: setChipValue,
        });
        props.className === "tt1_block"
          ? setTtbPlay((prevState) => ({
              ...prevState,
              [`COLUMN_${props.ttbIndex}`]: chipValue,
            }))
          : setEachPlay((prevState) => ({
              ...prevState,
              [`EACH_${props.num}`]: chipValue,
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
