import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import { toast } from "react-toastify";
import { FaBtc, FaEthereum, FaUser } from "react-icons/fa";
import Select from "./Select";
export default function Header() {
  const {
    customerData,
    totalAmount,
    setShowLogin,
    setShowRegistered,
    logged,
    setLogged,
    btcValue,
    ethValue,
    usdtValue,
  } = useUI();
  const [select, setSelect] = useState(false);
  const BTC = () => {
    return (
      <>
        <FaBtc
          style={{
            backgroundColor: "orange",
            padding: "3px",
            borderRadius: "50%",
            fontSize: "1.5em",
          }}
        />
        &nbsp; {(totalAmount / btcValue).toFixed(8)}&nbsp;BTC
      </>
    );
  };
  const ETH = () => {
    return (
      <>
        <FaEthereum
          style={{
            backgroundColor: "#55f",
            padding: "3px",
            borderRadius: "50%",
            fontSize: "1.5em",
          }}
        />
        &nbsp; {(totalAmount / ethValue).toFixed(8)}&nbsp;ETH
      </>
    );
  };
  const USDT = () => {
    return (
      <>
        <img
          style={{
            fontSize: "1.5em",
            width: "1em",
            height: "1em",
          }}
          src={
            "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
          }
        ></img>
        &nbsp; {totalAmount / usdtValue}&nbsp;USDT
      </>
    );
  };
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const selectedCryptoComponent = (
    <span className="current">
      {selectedCrypto === "BTC" && <BTC />}
      {selectedCrypto === "ETH" && <ETH />}
      {selectedCrypto === "USDT" && <USDT />}
    </span>
  );

  return (
    <div>
      <header
        className="header-section"
        style={{
          position: "fixed",
          top: 0,
          background: "#202a39",
          padding: "16px 0",
        }}
      >
        <div className="container-fluid p-0">
          <div className="header-wrapper">
            <div className="menu__left__wrap">
              <div className="logo-menu px-2">
                <Link to={"/"}>
                  <i className="fas fa-dice h3 text-warning   "></i> &nbsp;
                  <span className="h4">Casino</span>
                </Link>
              </div>
              {customerData && (
                <Select
                  current={
                    <span
                      className="current"
                      style={{ fontWeight: "bold", fontSize: "1.2em" }}
                    >
                      <FaUser />
                      &nbsp; &nbsp;{customerData.name}
                    </span>
                  }
                  array={[
                    {
                      component: (
                        <Link
                          to={"/"}
                          style={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setLogged(false);
                            toast.success("Logged out!");
                          }}
                        >
                          Log Out
                        </Link>
                      ),
                    },
                  ]}
                />
              )}
            </div>
            {logged && (
              <div className="mneu-btn-grp">
                <Select
                  current={selectedCryptoComponent}
                  array={[
                    {
                      onClick: () => {
                        setSelectedCrypto("BTC");
                      },
                      component: <BTC />,
                    },
                    {
                      onClick: () => {
                        setSelectedCrypto("ETH");
                      },
                      component: <ETH />,
                    },
                    {
                      onClick: () => {
                        setSelectedCrypto("USDT");
                      },
                      component: <USDT />,
                    },
                  ]}
                />

                <Link
                  to={"/deposit"}
                  className="cmn--btn"
                  data-bs-toggle="modal"
                >
                  <span className="rela">Deposit</span>
                </Link>
                <Link
                  to={"/withdraw"}
                  className="cmn--btn2"
                  data-bs-toggle="modal"
                >
                  <span className="rela">Withdraw</span>
                </Link>
              </div>
            )}
            {!logged && (
              <div className="mneu-btn-grp">
                <button
                  className="cmn--btn"
                  data-bs-toggle="modal"
                  onClick={() => {
                    setShowLogin((prevState) => !prevState);
                    setShowRegistered(false);
                  }}
                >
                  <span className="rela" style={{ color: "white" }}>
                    Log in
                  </span>
                </button>
                <button
                  className="cmn--btn2"
                  data-bs-toggle="modal"
                  onClick={() => {
                    setShowRegistered((prevState) => !prevState);
                    setShowLogin(false);
                  }}
                >
                  <span className="rela" style={{ color: "white" }}>
                    Register
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
