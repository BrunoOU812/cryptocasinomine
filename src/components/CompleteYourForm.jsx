import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
export default function CompleteYourForm(props) {
  const { transaction } = useParams();
  const {
    setDepositResponse,
    setWithdrawResponse,
    api,
    btcValue,
    ethValue,
    setMsg,
    selectedCoin,
    setTransactionID,
  } = useUI();
  const { register, reset, error, handleSubmit, watch } = useForm();
  const watchAmount =
    selectedCoin === "USDT"
      ? watch("amount")
      : selectedCoin === "ETH"
      ? (watch("amount") / ethValue).toFixed(8)
      : (watch("amount") / btcValue).toFixed(8);
  const coinID = selectedCoin === "BTC" ? 6 : selectedCoin === "ETH" ? 7 : 8;
  const navigate = useNavigate();
  const handleDepositNowClick = async (data) => {
    try {
      const response = await axios.get(
        `${api}/api/customers?name=${data.name}`
      );
      const customerData = response.data.data;
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      if (customerData.length > 0) {
        const customer = customerData[0];

        const operation =
          transaction === "deposit"
            ? {
                to: data.name,
                customer_id: customer.id,
                value: data.amount,
                datetime: formattedDateTime,
                crypto_id: coinID,
                status: "Pending",
                comment: data.comment,
              }
            : {
                to: data.name,
                customer_id: customer.id,
                customer_name: customer.name,
                value: data.amount,
                tokens: data.amount,
                withdraw_address: "unknown",
                datetime: formattedDateTime,
                crypto_id: coinID,
                status: "Pending",
                comment: data.comment,
              };
        transaction === "deposit"
          ? setDepositResponse(operation)
          : setWithdrawResponse(operation);
        {
          data.comment &&
            setMsg((prevState) => [
              ...prevState,
              { to: customerData.name, comment: data.comment },
            ]);
        }
        try {
          const transAct = await axios.post(
            `${api}/api/${transaction}s`,
            operation
          );
          setTransactionID({ type: transaction, id: transAct.data.data.id });
          reset();
        } catch (error) {
          console.log(`Error making ${operation}:`, error);
          // toast.error("Error making transaction:", error);
        }
        navigate(`/${transaction}/cryptochat`);
      } else {
        toast.error("First complete the form correctly");
      }
    } catch (error) {
      toast.error("Error fetching customer data:", error);
    }
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
        <h3>
          Complete Your {selectedCoin} {transaction}
        </h3>

        <form action="#" onSubmit={handleSubmit(handleDepositNowClick)}>
          <div className="deposit__wallet">
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>* Amount</p>
            </div>
            <div
              className="single-input mb__20"
              style={{ position: "relative" }}
            >
              <input
                type="text"
                id="dAmount"
                name="amount"
                placeholder="Enter Amount"
                autoComplete="off"
                {...register("amount")}
              />
              <div
                className="amount-preview"
                style={{
                  paddingTop: "10px",
                  color: "#888",
                }}
              >
                Aproximately:&nbsp;{watchAmount}&nbsp;
                {props.type}
              </div>
            </div>
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>* Your-in-game-name:</p>
            </div>
            <div className="single-input">
              <input
                name="name"
                type="text"
                id="eemail"
                placeholder="User Name"
                autoComplete="off"
                {...register("name")}
              />
            </div>
            <br />
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>Comment:</p>
            </div>
            <div>
              <textarea
                style={{
                  width: "100%",
                  background: "var(--signbet)",
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
              ></textarea>
            </div>
          </div>
          <div className="btn-area">
            <input
              type="submit"
              className="cmn--btn"
              value={`${transaction} Now`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
