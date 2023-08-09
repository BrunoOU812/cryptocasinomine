import React from "react";

export default function ConfirmDepositMsg(props) {
  return (
    <div
      className="deposit__complate"
      style={{
        margin: 0,
        textAlign: "left",
        marginBottom: "30px",
        color: "white",
        padding: "20px",
      }}
    >
      <h5>friendlyBulgarian</h5>
      <hr />
      <p>props.data.message</p>
    </div>
  );
}
