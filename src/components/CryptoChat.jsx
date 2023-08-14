import React, { useEffect, useState } from "react";
import CompleteYourDeposit from "./depositRelated/CompleteYourDeposit";
import ConfirmDepositMsg from "./depositRelated/ConfirmDepositMsg";
import { useUI } from "../contexts/UIContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Ticket from "./Ticket";
import CryptoMsg from "./CryptoMsg";
export default function Deposit() {
  const {
    depositResponses,
    withdrawResponses,
    api,
    setDepositResponse,
    msg,
    setMsg,
    customerData,
  } = useUI();
  const { register, reset, error, handleSubmit, watch } = useForm();
  const { cryptoType, transaction } = useParams();
  console.log(cryptoType);
  const handleDepositNowClick = async (data) => {
    setMsg((prevState) => [
      ...prevState,
      { to: customerData.name, comment: data.msg },
    ]);
    reset();
  };

  return (
    <div className="container">
      <div className="row g-100 my-4">
        <Ticket
          props={
            transaction === "deposit"
              ? depositResponses[depositResponses.length - 1]
              : withdrawResponses[withdrawResponses.length - 1]
          }
          transaction={transaction}
        />
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2vw",
          }}
        >
          <div
            id="confirmChat"
            style={{ flexGrow: 1, overflowY: "scroll", maxHeight: "700px" }}
          >
            {msg.map((response, index) => (
              <CryptoMsg
                key={index}
                props={{
                  msg: response.comment,
                }}
              />
            ))}
          </div>
          <form
            className="d-flex justify-content-between align-content-center p-3"
            style={{
              backgroundColor: "#283968",
              borderRadius: "0 0 10px 10px",
            }}
            onSubmit={handleSubmit(handleDepositNowClick)}
          >
            <input
              type="text"
              placeholder="Type chat messages here"
              className="px-2"
              name="msg"
              style={{
                height: "40px",
                alignSelf: "center",
                border: "none",
                borderRadius: "10px",
                flex: 1,
                marginRight: "10px",
                color: "#444",
              }}
              {...register("msg")}
            />
            <input
              className="cmn--btn ml-auto"
              type="submit"
              style={{
                height: "40px",
                alignSelf: "center",
                border: "none",
                color: "white",
              }}
              value="Send"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
