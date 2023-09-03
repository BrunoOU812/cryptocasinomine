import React from "react";
import Bank from "./Bank";
import BankSpan from "./BankSpan";
import BetSpan from "./BetSpan";
import Bet from "./Bet";
import styles from "../assets/styles.module.scss";
export default function BankContainer() {
  return (
    <div className={styles["bankContainer"]} style={{ height: "50px" }}>
      <Bank>
        <BankSpan />
      </Bank>
      <Bet>
        <BetSpan />
      </Bet>
    </div>
  );
}
