import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUI } from "../../contexts/UIContext";

export default function CompleteYourDeposit() {
  const [amount, setAmount] = useState("");
  const [inGameName, setInGameName] = useState("");
  const [comment, setComment] = useState("");
  const { setDepositResponse } = useUI();
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
    console.log(inGameName);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/customers?name=${inGameName}`
      );
      console.log(response);
      const customerData = response.data.data;
      if (customerData.length > 0) {
        const customerId = customerData[0].id;
        console.log(
          response.data.data[0].name,
          customerId,
          amount,
          new Date().toISOString()
        );
        const depositResponse = {
          customer_id: customerId,
          amount: amount,
          datetime: "2023-08-09 14:00:00",
          crypto_id: 1,
          status: "Pending",
        };
        console.log(depositResponse);
        setDepositResponse(depositResponse); // Asumiendo que addDepositResponse es la función del contexto para agregar respuestas
        try {
          const postResponse = await axios.post(
            "http://localhost:8000/api/deposits",
            depositResponse
          );
          console.log("Deposit successful:", postResponse.data);
          // Aquí puedes hacer algo con la respuesta, como mostrar un mensaje
        } catch (error) {
          console.error("Error making deposit:", error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error
        }
      } else {
        console.error("Customer not found");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
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

        <form action="#">
          <div className="deposit__wallet">
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>Amount</p>
            </div>
            <div className="single-input mb__20">
              <input
                type="text"
                id="dAmount"
                placeholder="Enter Amount"
                value={amount}
                autoComplete="off"
                onChange={handleAmountChange}
              />
            </div>
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>Your-in-game-name:</p>
            </div>
            <div className="single-input">
              <input
                type="text"
                id="eemail"
                placeholder="Email"
                autoComplete="off"
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
                onChange={handleCommentChange}
                name=""
                id="eemail"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="btn-area">
            <button onClick={handleDepositNowClick} className="cmn--btn">
              <span>Deposit Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
