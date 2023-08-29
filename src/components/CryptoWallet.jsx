import React, { useEffect, useState } from "react";
import { useUI } from "../contexts/UIContext";
import { useParams } from "react-router-dom";
import DepositInfo from "./depositRelated/DepositInfo";
import CryptoAddress from "./CryptoAddress";
export default function CryptoWallet() {
  const { depositResponses } = useUI();
  const { cryptoType } = useParams();
  useEffect(() => {
    console.log(depositResponses);
  }, [depositResponses]);
  return (
    <div className="container">
      <div className="row g-100 my-4">
        <CryptoAddress type={cryptoType}></CryptoAddress>
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2vw",
          }}
        >
          <DepositInfo></DepositInfo>
        </div>
      </div>
    </div>
  );
}
