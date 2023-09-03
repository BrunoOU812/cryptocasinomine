import React from "react";
import Bo3Board from "./Bo3Board";
import OtoBoard from "./OtoBoard";
import BankContainer from "./BankContainer";
import ChipDeck from "./ChipDeck";
import PnBlock from "./PnBlock";
import Bbtop from "./Bbtop";
import NumberBoard from "./NumberBoard";
import Wl from "./Wl";
import styles from "../assets/styles.module.scss";

export default function BettingBoard() {
  return (
    <div id={styles["betting_board"]}>
      <Wl />
      <Bbtop />
      <NumberBoard />
      <Bo3Board />
      <OtoBoard />
      <ChipDeck />
      <BankContainer />
      <PnBlock />
    </div>
  );
}
