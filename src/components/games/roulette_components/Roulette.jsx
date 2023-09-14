import Wheel from "./buildWheel/Wheel";
import ContextProvider, { useCasino } from "./Context";
import BettingBoard from "./buildBettingBoard/BettingBoard";
import SpinBtn from "./buildBettingBoard/SpinBtn";
import React from "react";
import styles from "./assets/styles.module.scss";

export default function Roulette() {
  return (
    <ContextProvider>
      <div
        className="App"
        style={{
          fontFamily: "arial",
        }}
      >
        <div
          id={styles["container"]}
          style={{ height: "600px", display: "flex", alignContent: "center" }}
        >
          <Wheel />
          <BettingBoard />
          <SpinBtn />
        </div>
        {/* <div>{plays !== undefined && plays}</div> */}
      </div>
    </ContextProvider>
  );
}
