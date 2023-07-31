// PageContainer.js
import React from "react";
import Footer from "./Footer";
import Header from "../Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Casino from "../Casino";
import { useUI } from "../../contexts/UIContext";
import Deposit from "../Deposit";
import { DepositRouter } from "../depositRelated/DepositRouter";
import ConfirmDeposit from "../ConfirmDeposit";
import Login from "../Login";

export default function PageContainer() {
  const { isExpanded } = useUI();
  const maxWidthValue = isExpanded ? "100% - 342px" : "100%";

  return (
    <Router>
      <Header />
      <div className="main__body__area">
        <div
          style={{
            marginTop: `${87}px`,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        ></div>
        <div
          className="rest-of-page-container"
          style={{ maxWidth: `calc(${maxWidthValue})` }}
        >
          <DepositRouter />
          <div className="flex-grow-1 z-2 ">
            <div
              className="modal event__modal"
              id="eventsp"
              tabIndex="-1"
              aria-hidden="true"
            ></div>
            <Routes>
              <Route path="/" element={<Casino />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/confirmDeposit" element={<ConfirmDeposit />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}
