import React, { useEffect } from "react";
import { FaBtc, FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
export default function Deposit() {
  const { setSelectedCoin } = useUI();
  const { transaction } = useParams();
  const SelectionComponent = (props) => {
    const { to, coin, nomenclature } = props;
    return (
      <Link
        onClick={() => {
          toast.warning(nomenclature);
          setSelectedCoin(nomenclature);
        }}
        to={to}
        style={{
          width: "200px",
          height: "150px",
          border: "#fff 1px solid",
          margin: "0 10px 0 10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10%",
          backgroundColor: "transparent",
          transition: "background-color 0.3s",
          transition: "border 0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.border = "transparent 1px solid";
          e.target.style.backgroundColor = "#333";
        }}
        onMouseLeave={(e) => {
          e.target.style.border = "#fff 1px solid";
          e.target.style.backgroundColor = "transparent";
        }}
      >
        {coin}
      </Link>
    );
  };
  return (
    <div className="container">
      <div className="row g-100 my-4">
        <h2
          style={{
            marginBottom: "20px",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          {transaction}&nbsp;transaction
        </h2>{" "}
        <div
          style={{
            color: "white",
            marginBottom: "50px",
            marginTop: "50px",
            height: "500px",
          }}
        >
          {" "}
          <h1 style={{ marginBottom: "20px" }}>Crypto</h1>{" "}
          <div
            style={{
              display: "flex",
            }}
          >
            <SelectionComponent
              nomenclature="BTC"
              to={`/cryptoWallet/${transaction}/BTC`}
              coin={
                <FaBtc
                  style={{
                    backgroundColor: "orange",
                    padding: "0.1em",
                    borderRadius: "50%",
                    fontSize: "5.5em",
                  }}
                />
              }
            />
            {/* <SelectionComponent
              nomenclature="BTC"
              to={`/transactionForm/${transaction}/BTC`}
              coin={
                <FaBtc
                  style={{
                    backgroundColor: "orange",
                    padding: "0.1em",
                    borderRadius: "50%",
                    fontSize: "5.5em",
                  }}
                />
              }
            /> */}
            <SelectionComponent
              nomenclature="ETH"
              to={`/cryptoWallet/${transaction}/ETH`}
              coin={
                <FaEthereum
                  style={{
                    backgroundColor: "#55F",
                    padding: "0.1em",
                    borderRadius: "50%",
                    fontSize: "5.5em",
                  }}
                />
              }
            />
            <SelectionComponent
              nomenclature="USDT"
              to={`/cryptoWallet/${transaction}/USDT`}
              coin={
                <img
                  style={{
                    fontSize: "5.5em",
                    width: "1em",
                    height: "1em",
                    backgroundColor: "transparent",
                  }}
                  src={
                    "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
                  }
                ></img>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
