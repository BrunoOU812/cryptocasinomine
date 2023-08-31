import Wheel from "./buildWheel/Wheel";
import ContextProvider from "./Context";
import BettingBoard from "./buildBettingBoard/BettingBoard";
import SpinBtn from "./buildBettingBoard/SpinBtn";
import React from "react";
// import styles from "./assets/styles.module.scss";
import styles from "./assets/styles.module.scss";
export default function Roulette() {
  return (
    <ContextProvider>
      <div className="App" style={{ fontFamily: "arial" }}>
        <div id={styles["container"]}>
          <Wheel />
          <BettingBoard />
          <SpinBtn />
        </div>
      </div>
    </ContextProvider>
  );
}
