import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import QR from "../assets/img/QR.png";
export default function CryptoAddress(props) {
  const { transaction } = useParams();
  const qr = QR;
  const {
    setDepositResponse,
    setWithdrawResponse,
    api,
    btcValue,
    ethValue,
    usdtValue,
    setMsg,
    selectedCoin,
  } = useUI();
  const { register, reset, error, handleSubmit, watch } = useForm();
  const watchAmount =
    selectedCoin === "USDT"
      ? watch("amount")
      : selectedCoin === "ETH"
      ? (watch("amount") / ethValue).toFixed(8)
      : (watch("amount") / btcValue).toFixed(8);
  const navigate = useNavigate();
  const handleDepositNowClick = () => {
    navigate(`/transactionForm/${transaction}/${selectedCoin}`);
  };
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
        <h3 style={{ textTransform: "capitalize" }}>
          {transaction} with Crypto
        </h3>
        <form action="#" onSubmit={handleSubmit(handleDepositNowClick)}>
          <div className="deposit__wallet">
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>
                * Your {selectedCoin} {transaction} address:
              </p>
            </div>
            <div className="single-input">
              <input
                name="name"
                type="text"
                id="eemail"
                disabled={transaction === "deposit" ? true : false}
                placeholder={
                  transaction === "deposit"
                    ? "0xAbCdEfGhIjKlMnOpQrStUvWxYz1234567890"
                    : "Your Wallet Address"
                }
                autoComplete="off"
                {...register("name")}
              />
            </div>
            <br />
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>Scan with moblie [qr code]:</p>
            </div>
            <div>
              {transaction === "deposit" && (
                <img
                  src={qr}
                  style={{
                    width: "40%",
                    background: "#FFF",
                    borderRadius: "10px",
                    padding: "15px 10px 15px",
                    outline: "none",
                    border: "none",
                    color: "#858B9D",
                    fontSize: "12px",
                  }}
                  {...register("comment")}
                  name="comment"
                  id="eemail"
                  cols="30"
                  rows="10"
                ></img>
              )}
            </div>
          </div>
          <div className="btn-area">
            <input
              type="submit"
              className="cmn--btn"
              value={`Request ${transaction}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
