import React from "react";
import { useCasino } from "../Context";

export default function SpinBtn() {
  const { spinBtnValue, setSpinBtn, setSpin, currentBet } = useCasino();
  return (
    <div
      className={`${currentBet > 0 && spinBtnValue ? "spinBtn" : ""}`}
      onClick={() => {
        setSpin(true);
        setSpinBtn(false);
      }}
    >
      {currentBet > 0 && spinBtnValue && "Spin"}
    </div>
  );
}
