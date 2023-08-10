import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
export default function Header() {
  const { totalAmount } = useUI();
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
              {/* <div className="lang d-flex align-items-center px-2">
                <div className="language__wrap">
                  <div className="flag">
                    <i className="fas fa-money-bill text-warning h-100   h4"></i>
                  </div>
                  <select name="flag" id="flag-img2">
                    <option value="1">9900</option>
                  </select>
                </div>
                <div className="header-bar d-lg-none">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div> */}
            </div>
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
                <div
                  className="flag"
                  // style={{ display: "flex", alignItems: "center" }}
                >
                  <i className="fas fa-money-bill text-warning h-100   h4"></i>
                </div>
                {/* <select name="flag" id="flag-img2">
                  <option value="1">9900</option>
                </select> */}
              </div>
              <Link to={"/deposit"} className="cmn--btn" data-bs-toggle="modal">
                <span className="rela">Deposit</span>
              </Link>
              <Link to={"/"} className="cmn--btn2" data-bs-toggle="modal">
                <span className="rela">Withdraw</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
