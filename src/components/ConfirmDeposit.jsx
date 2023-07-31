import React from "react";
import CompleteYourDeposit from "./depositRelated/CompleteYourDeposit";
import Message from "./chatRelated/Message";
import ConfirmDepositMsg from "./depositRelated/ConfirmDepositMsg";

export default function Deposit() {
  return (
    <div className="container">
      <div className="row g-100 my-4">
        <CompleteYourDeposit></CompleteYourDeposit>
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2vw",
          }}
        >
          <div
            id="confirmChat"
            style={{ flexGrow: 1, overflowY: "scroll", maxHeight: "700px" }}
          >
            <ConfirmDepositMsg></ConfirmDepositMsg>
          </div>
          <form
            className="d-flex justify-content-between align-content-center p-3"
            style={{
              backgroundColor: "#283968",
              borderRadius: "0 0 10px 10px",
            }}
          >
            <input
              type="text"
              placeholder="Type chat messages here"
              className="px-2"
              style={{
                height: "40px",
                alignSelf: "center",
                border: "none",
                borderRadius: "10px",
                flex: 1,
                marginRight: "10px",
              }}
            />
            <button
              className="cmn--btn ml-auto"
              type="submit"
              style={{
                height: "40px",
                alignSelf: "center",
                border: "none",
                color: "white",
              }}
            >
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
