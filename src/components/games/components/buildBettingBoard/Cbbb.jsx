import React, { useEffect, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Cbbb(props) {
  const [chip, setChip] = useState(false);
  const [chipValue, setChipValue] = useState(0);
  const [chipColour, setChipColour] = useState("red");
  const { clear, setBet, removeBet, setQuarter1Play, setQuarter2Play } =
    useCasino();
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
      id={styles[`cbbb_${props.index + 1}`]}
      className={styles[`cbbb`]}
      onClick={() => {
        setBet({ chip: chip, setChip: setChip, setChipValue: setChipValue });
        props.wlcbIndex === 0
          ? setQuarter1Play((prevState) => ({
              ...prevState,
              [`QUARTER1_${props.index}`]: chipValue,
            }))
          : setQuarter2Play((prevState) => ({
              ...prevState,
              [`QUARTER2_${props.index}`]: chipValue,
            }));
      }}
      onContextMenu={(e) => {
        removeBet({
          e: e,
          chipValue: chipValue,
          setChipValue: setChipValue,
        });
        props.wlcbIndex === 0
          ? setQuarter1Play((prevState) => ({
              ...prevState,
              [`QUARTER1_${props.index}`]: chipValue,
            }))
          : setQuarter2Play((prevState) => ({
              ...prevState,
              [`QUARTER2_${props.index}`]: chipValue,
            }));
      }}
    >
      {chip && (
        <div className={`${styles[`chip`]} ${styles[`${chipColour}`]}`}>
          <div className={styles["chipSpan"]}>{chipValue}</div>
        </div>
      )}
    </div>
  );
}
