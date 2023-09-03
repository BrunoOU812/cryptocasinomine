import React, { useEffect, useState } from "react";
import OuterRim from "./OuterRim";
import Sect from "./Sect";
import Cone from "./Cone";
import Pockets from "./Pockets";
import PocketsRim from "./PocketsRim";
import ThendOne from "./ThendOne";
import ThendTwo from "./ThendTwo";
import Turret from "./Turret";
import styles from "../assets/styles.module.scss";
import TurretHandle from "./TurretHandle";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useCasino } from "../Context";
import Ball from "./Ball";
import { v4 as uuidv4 } from "uuid";
export default function Wheel() {
  const {
    spin,
    setSpin,
    setSpinBtn,
    clearBet,
    setPreviousNumbers,
    winningNumber,
  } = useCasino();
  const [allowWheel, setAllowWheel] = useState(false);
  const [ballAnimation, setBallAnimation] = useState(
    "ballRotate 1s linear infinite"
  );
  const [rotationFrom, setRotationFrom] = useState(0);
  const [rotationTo, setRotationTo] = useState(0);
  const [style, setStyle] = useState(false);
  const wheelRotate = "wheelRotate 5s linear infinite";
  const numbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];
  let wheelnumbersAC = [
    0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10,
    23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32,
  ];
  const sectElements = Array(numbers.length)
    .fill()
    .map((_, i) => {
      const a = i + 1;
      const spanClass = numbers[i] < 10 ? styles["single"] : styles["double"];
      const uniqueKey = uuidv4();
      return (
        <Sect
          key={uniqueKey}
          id={"sect" + a}
          number={numbers[i]}
          spanClass={spanClass}
        />
      );
    });

  useEffect(() => {
    if (spin) {
      const winningSpin = 3;
      // const winningSpin = Math.floor(Math.random() * 36);
      wheelnumbersAC.forEach((_, i) => {
        if (wheelnumbersAC[i] == winningSpin) {
          setRotationTo(i * 9.73 + 362);
        }
      });
      winningNumber.current = winningSpin;
      setStyle(true);
      setTimeout(() => {}, 2000);
      setTimeout(() => {
        // setBallAnimation("ballRotate 2s linear infinite");
      }, 6000);
      setTimeout(() => {
        // setRotationTo(degree);
      }, 9000);
      setTimeout(() => {
        setSpin(false);
        // setBallAnimation("ballStop 3s linear");
        setBallAnimation("ballRotate 2s linear infinite");
        setSpinBtn(true);
        setStyle(false);
        clearBet(true);
        setRotationFrom(rotationTo);
        setPreviousNumbers((prevState) => [...prevState, winningSpin]);
      }, 1000);
    }
  }, [spin]);
  return (
    <div
      className={styles["wheel"]}
      style={style ? { animation: `${wheelRotate}` } : {}}
    >
      <HelmetProvider>
        <Helmet>
          <style>
            {`
        @keyframes ballStop {
          from { transform: rotate(-${rotationFrom}deg); }
          to { transform: rotate(-${rotationTo}deg); }
        }
      `}
          </style>
        </Helmet>
      </HelmetProvider>

      <OuterRim />
      {sectElements}
      <div
        className={styles[`ballTrack`]}
        style={{
          animation: `${style && ballAnimation}`,
          transform: `rotate(-${rotationTo}deg)`,
        }}
      >
        <Ball />
      </div>
      <Pockets />
      <PocketsRim />
      <Cone />
      <Turret />
      <TurretHandle>
        <ThendTwo />
        <ThendOne />
      </TurretHandle>
    </div>
  );
}
