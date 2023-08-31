import React from "react";
import { useCasino } from "../Context";

export default function BankSpan() {
  const { bankValue } = useCasino();
  return <div id="bankSpan">{"" + bankValue.toLocaleString("en-GB") + ""}</div>;
}
