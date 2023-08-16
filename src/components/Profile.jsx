import React, { useEffect, useState } from "react";
import CompleteYourDeposit from "./depositRelated/CompleteYourDeposit";
import ConfirmDepositMsg from "./depositRelated/ConfirmDepositMsg";
import { useUI } from "../contexts/UIContext";
import { useParams } from "react-router-dom";
import DepositInfo from "./depositRelated/DepositInfo";
import ProfileForm from "./ProfileForm";
export default function Profile() {
  const { depositResponses } = useUI();
  const { cryptoType } = useParams();
  useEffect(() => {
    console.log(depositResponses);
  }, [depositResponses]);
  return (
    <div className="container">
      <div className="row g-100 my-4" style={{ flexWrap: "wrap" }}>
        <ProfileForm type={cryptoType}></ProfileForm>
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2vw",
          }}
        ></div>
      </div>
    </div>
  );
}
