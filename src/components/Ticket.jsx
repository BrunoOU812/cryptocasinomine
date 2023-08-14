import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useUI } from "../contexts/UIContext";
export default function Ticket({ props, transaction }) {
  const { selectedCoin, btcValue, ethValue, usdtValue } = useUI();
  console.log(props);
  let crypto;
  switch (selectedCoin) {
    case "BTC":
      crypto = btcValue;
      break;
    case "ETH":
      crypto = ethValue;
      break;
    case "USDT":
      crypto = usdtValue;
      break;
    default:
      crypto = btcValue;
  }

  return (
    <div
      className="col"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2vw",
      }}
    >
      <div
        className="deposit__complate"
        style={{
          textAlign: "left",
          width: "100%",
          margin: "0 0 0 -10px",
        }}
      >
        <form action="#">
          <div className="deposit__wallet">
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <h1 style={{ color: "white", textTransform: "capitalize" }}>
                {selectedCoin}&nbsp;Ticket&nbsp;{transaction}
              </h1>
            </div>
            <div
              className="single-input mb__20"
              style={{ position: "relative", color: "white" }}
            >
              <hr />
              <br />
              <p style={{ fontSize: "1.5em", textTransform: "capitalize" }}>
                <span style={{ fontWeight: "bold" }}>Type:&nbsp;</span>{" "}
                {transaction}
                <br />
                <br />
                <span style={{ fontWeight: "bold" }}>To:&nbsp;</span> {props.to}
                <br />
                <br />
                <span style={{ fontWeight: "bold" }}>
                  {selectedCoin}:&nbsp;
                </span>{" "}
                {selectedCoin == "USDT"
                  ? props.value / crypto
                  : (props.value / crypto).toFixed(8)}
                <br />
                <br />
                <span style={{ fontWeight: "bold" }}>Value:&nbsp;</span> $
                {props.value}
                <br /> <br />{" "}
                <span style={{ fontWeight: "bold" }}>Datetime:&nbsp;</span>{" "}
                {props.datetime}
                <br /> <br />{" "}
                <span style={{ fontWeight: "bold" }}>Status:&nbsp;</span>{" "}
                Complete
                <br /> <br /> <br /> <br /> <br /> <br />
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
