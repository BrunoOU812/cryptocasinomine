import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUI } from "../../contexts/UIContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
export default function CompleteYourDeposit(props) {
  const {
    setDepositResponse,
    api,
    btcValue,
    ethValue,
    usdtValue,
    setMsg,
    selectedCoin,
  } = useUI();
  const { register, reset, error, handleSubmit } = useForm();
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
        const customerId = customerData[0].id;

        const deposit = {
          to: data.name,
          customer_id: customerId,
          value: data.amount,
          datetime: formattedDateTime,
          crypto_id: 1,
          status: "Pending",
          comment: data.comment,
        };
        setDepositResponse(deposit);
        {
          data.comment &&
            setMsg((prevState) => [
              ...prevState,
              { to: customerData.name, comment: data.comment },
            ]);
        }
        try {
          await axios.post(`${api}/api/deposits`, deposit);
          reset();
        } catch (error) {
          console.log("Error making deposit:", error);
          // toast.error("Error making deposit:", error);
        }
        navigate("/deposit/cryptochat");
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
        <h3>Complete Your {selectedCoin} Deposit</h3>

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
              {/* <div
                className="amount-preview"
                style={{
                  paddingTop: "10px",
                  color: "#888",
                }}
              >
                Aproximately:&nbsp;{amountValue}&nbsp;
                {props.type}
              </div> */}
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
            <input type="submit" className="cmn--btn" value="Deposit Now" />
          </div>
        </form>
      </div>
    </div>
  );
}
