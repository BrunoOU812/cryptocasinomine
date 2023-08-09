import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CompleteYourDeposit from "./depositRelated/CompleteYourDeposit";
import DepositInfo from "./depositRelated/DepositInfo";
import { Link } from "react-router-dom";
export default function Deposit() {
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/deposits")
      .then((response) => {
        console.log(response.data);
        toast.success(JSON.stringify(response.data.message));
      })
      .catch((error) => {
        toast.error(JSON.stringify(error.message));
      });
  }, []);
  return (
    <div className="container">
      <div className="row g-100 my-4">
        <div style={{ color: "white", marginBottom: "50px" }}>
          {" "}
          <h1 style={{ marginBottom: "20px" }}>RS GOLD</h1>{" "}
          <div
            style={{
              display: "flex",
            }}
          >
            <Link
              to="/RSGold"
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "#333",
                margin: "0 10px 0 10px",
              }}
            ></Link>
          </div>
        </div>
        <div style={{ color: "white", marginBottom: "50px" }}>
          {" "}
          <h1 style={{ marginBottom: "20px" }}>Crypto</h1>{" "}
          <div
            style={{
              display: "flex",
            }}
          >
            <Link
              to="/crypto_deposit"
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "#333",
                margin: "0 10px 0 10px",
              }}
            ></Link>
            <Link
              to="/crypto_deposit"
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "#333",
                margin: "0 10px 0 10px",
              }}
            ></Link>
            <Link
              to="/crypto_deposit"
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "#333",
                margin: "0 10px 0 10px",
              }}
            ></Link>
            <Link
              to="/crypto_deposit"
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "#333",
                margin: "0 10px 0 10px",
              }}
            ></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
