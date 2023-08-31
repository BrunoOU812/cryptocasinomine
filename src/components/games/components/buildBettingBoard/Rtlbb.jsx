import React, { useEffect, useState } from "react";
import { useCasino } from "../Context";
import styles from "../assets/styles.module.scss";

export default function Rtlbb(props) {
  const [chip, setChip] = useState(false);
  const [chipValue, setChipValue] = useState(0);
  const [chipColour, setChipColour] = useState("red");
  const {
    clear,
    setBet,
    removeBet,
    sethalfV1Play,
    sethalfV2Play,
    sethalfV3Play,
  } = useCasino();
  const sethalfVPlay = {
    1: sethalfV1Play,
    2: sethalfV2Play,
    3: sethalfV3Play,
  };
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
      className={styles[`rtlbb${props.index + 1}`]}
      onClick={() => {
        setBet({ chip: chip, setChip: setChip, setChipValue: setChipValue });
        sethalfVPlay[`${props.index + 1}`]((prevState) => ({
          ...prevState,
          [`HALFV${props.index + 1}_${props.compIndex}`]: chipValue,
        }));
      }}
      onContextMenu={(e) => {
        removeBet({
          e: e,
          chipValue: chipValue,
          setChipValue: setChipValue,
        });
        sethalfVPlay[`${props.index + 1}`]((prevState) => ({
          ...prevState,
          [`HALFV${props.index + 1}_${props.compIndex}`]: chipValue,
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
