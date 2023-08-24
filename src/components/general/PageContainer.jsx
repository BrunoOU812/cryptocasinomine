// PageContainer.js
import React from "react";
import Footer from "./Footer";
import Header from "../Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Casino from "../Casino";
import { useUI } from "../../contexts/UIContext";
import Deposit from "../Deposit";
import SignIn from "../SignIn";
import Transaction from "../Transaction";
import { DepositRouter } from "../depositRelated/DepositRouter";
import ConfirmDeposit from "../ConfirmDeposit";
import RSGold from "../RSGold";
import CryptoDeposit from "../CryptoDeposit";
import CryptoChat from "../CryptoChat";
import Login from "../Login";
import Register from "../Register";
import RouletteGame from "../games/rouletteGame/RouletteGame";
import Withdraw from "../Withdraw";
import CryptoTransaction from "../CryptoTransaction";
import Profile from "../Profile";
import PrivateRoute from "../PrivateRoute";

import SlotGame from "../games/slots/SlotGame";

export default function PageContainer() {
  const { isExpanded } = useUI();
  const maxWidthValue = isExpanded ? "100% - 342px" : "100%";
  const { showLogin, showRegistered } = useUI();
  return (
    <Router>
      <Header />
      <div className="main__body__area">
        <div
          style={{
            marginTop: `${74}px`,
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
          {showLogin && <Login />}
          {showRegistered && <Register />}
          <div className="flex-grow-1 z-2 ">
            <div
              className="modal event__modal"
              id="eventsp"
              tabIndex="-1"
              aria-hidden="true"
            ></div>
            <Routes>
              <Route path="/" element={<Casino />} />
              <Route
                path="/transaction/:transaction"
                element={<PrivateRoute />}
              >
                <Route
                  path="/transaction/:transaction"
                  element={<Transaction />}
                />
              </Route>
              <Route
                path="/transactionForm/:transaction/:cryptoType"
                element={<CryptoTransaction />}
              />
              <Route path="/RouletteGame" element={<PrivateRoute />}>
                <Route path="/RouletteGame" element={<RouletteGame />} />
              </Route>
              <Route path="/SlotGame" element={<PrivateRoute />}>
                <Route path="/SlotGame" element={<SlotGame />} />
              </Route>
              <Route path="/:transaction/cryptochat" element={<PrivateRoute />}>
                <Route
                  path="/:transaction/cryptochat"
                  element={<CryptoChat />}
                />
              </Route>
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/signin" element={<SignIn />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}
