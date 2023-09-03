import React from "react";
import { useCasino } from "../Context";

export default function BetSpan() {
  const { currentBet } = useCasino();
  return <div id="betSpan">{"" + currentBet.toLocaleString("en-GB") + ""}</div>;
}
