import React from "react";
import { Link } from "react-router-dom";

export default function CompleteYourDeposit() {
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
                value="$20.00"
                autoComplete="off"
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
                name=""
                id="eemail"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div className="btn-area">
            <Link to="/confirmDeposit" className="cmn--btn">
              <span>Deposit Now</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
