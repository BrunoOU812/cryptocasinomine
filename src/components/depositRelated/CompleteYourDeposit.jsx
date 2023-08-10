import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUI } from "../../contexts/UIContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
export default function CompleteYourDeposit() {
  const [amount, setAmount] = useState("");
  const [inGameName, setInGameName] = useState("");
  const [comment, setComment] = useState("");
  const { setDepositResponse } = useUI();
  const { register, reset, error, handleSubmit } = useForm();
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleInGameNameChange = (event) => {
    setInGameName(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleDepositNowClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customers?name=${inGameName}`
      );
      const customerData = response.data.data;
      const now = new Date();

      // Obtén los componentes de la fecha y hora
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      // Formatea la cadena de fecha y hora en el formato deseado
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      if (customerData.length > 0) {
        const customerId = customerData[0].id;

        const deposit = {
          to: inGameName,
          customer_id: customerId,
          value: amount,
          datetime: formattedDateTime,
          crypto_id: 1,
          status: "Pending",
          comment: comment,
        };
        setDepositResponse(deposit);

        try {
          await axios.post("http://localhost:8000/api/deposits", deposit);
          setAmount("");
          setInGameName("");
          setComment("");
        } catch (error) {
          toast.error("Error making deposit:", error);
        }
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
        <h3>Complete Your Deposit</h3>

        <form action="#" onSubmit={handleSubmit(handleDepositNowClick)}>
          <div className="deposit__wallet">
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>* Amount</p>
            </div>
            <div className="single-input mb__20">
              <input
                type="text"
                id="dAmount"
                placeholder="Enter Amount"
                value={amount}
                autoComplete="off"
                ref={register}
                onChange={handleAmountChange}
              />
            </div>
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>* Your-in-game-name:</p>
            </div>
            <div className="single-input">
              <input
                type="text"
                id="eemail"
                placeholder="User Name"
                autoComplete="off"
                ref={register}
                onChange={handleInGameNameChange}
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
                ref={register}
                onChange={handleCommentChange}
                name=""
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
