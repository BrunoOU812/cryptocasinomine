import React from "react";
import CompleteYourDeposit from "./depositRelated/CompleteYourDeposit";
import DepositInfo from "./depositRelated/DepositInfo";

export default function Deposit() {
  return (
    <div className="container">
      <div className="row g-100 my-4">
        <CompleteYourDeposit></CompleteYourDeposit>
        <DepositInfo></DepositInfo>
      </div>
    </div>
  );
}
