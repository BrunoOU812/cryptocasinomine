import React, { useEffect, useState, useRef } from "react";
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

import { Keyframes } from "../helpers/Keyframes";

export default function Wheel() {
  const {
    spin,
    setSpin,
    setSpinBtn,
    clearBet,
    setPreviousNumbers,
    winningNumber,
    setUpdateBank,
  } = useCasino();
  /*const [allowWheel, setAllowWheel] = useState(false);
  const [ballAnimation, setBallAnimation] = useState(
    "ballRotate 1s linear infinite"
  );*/
  //const [rotationFrom, setRotationFrom] = useState(0);
  const [updateUpdateBank, setUpdateUpdateBank] = useState(false);
  const [rotationTo, setRotationTo] = useState(0);
  const [style, setStyle] = useState(false);

  const ballTrack = useRef(null);

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
    if (rotationTo) {
      setStyle(true);
      setBallAnimation("ballRotate 1s linear infinite");

      setTimeout(() => {
        setBallAnimation("ballRotate 2s linear infinite");
      }, 2000);

      setTimeout(() => {
        setBallAnimation("ballStop 3s linear");
      }, 6000);

      setTimeout(() => {
        setBallRotation();
      }, 9000);

      setTimeout(() => {
        setSpin(false);
        setSpinBtn(true);
        setStyle(false);
        clearBet(true);
        setPreviousNumbers((prevState) => [
          ...prevState,
          winningNumber.current,
        ]);
        setUpdateUpdateBank((prevState) => !prevState);
      }, 10000);
    }
  }, [rotationTo]);
  useEffect(() => {
    setUpdateBank((prevState) => !prevState);
  }, [updateUpdateBank]);
  useEffect(() => {
    if (spin) {
      // const winningSpin = 0;
      const winningSpin = Math.floor(Math.random() * 36);

      winningNumber.current = winningSpin;
      wheelnumbersAC.forEach((_, i) => {
        if (wheelnumbersAC[i] === winningSpin) {
          setRotationTo(i * 9.73 + 362);
        }
      });
    }
  }, [spin]);

  const setBallRotation = () => {
    ballTrack.current.style.transform = `rotate(-${rotationTo}deg)`;
  };

  const setBallAnimation = (ballAnimation) => {
    ballTrack.current.style.animation = ballAnimation;
  };

  return (
    <div
      className={styles["wheel"]}
      style={style ? { animation: `${wheelRotate}` } : {}}
    >
      <HelmetProvider>
        <Keyframes
          name="ballStop"
          from={{ transform: "rotate(-0deg)" }}
          to={{ transform: `rotate(-${rotationTo}deg)` }}
        />
      </HelmetProvider>

      <OuterRim />
      {sectElements}
      <div className={styles[`ballTrack`]} ref={ballTrack}>
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
