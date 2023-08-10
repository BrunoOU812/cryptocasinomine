import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import { toast } from "react-toastify";
export default function Header() {
  const { totalAmount, setShowLogin, setShowRegistered, logged, setLogged } =
    useUI();
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
            </div>
            {logged && (
              <div className="mneu-btn-grp">
                <div className="language__wrap">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    ${totalAmount}
                  </span>
                  <div className="flag">
                    <i className="fas fa-money-bill text-warning h-100   h4"></i>
                  </div>
                </div>
                <Link
                  to={"/deposit"}
                  className="cmn--btn"
                  data-bs-toggle="modal"
                >
                  <span className="rela">Deposit</span>
                </Link>
                <Link to={"/"} className="cmn--btn2" data-bs-toggle="modal">
                  <span className="rela">Withdraw</span>
                </Link>
                <a
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
                </a>
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
