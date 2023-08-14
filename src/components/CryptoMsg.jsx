import React, { useState, useEffect } from "react";
import { useUI } from "../contexts/UIContext";

export default function CryptoMsg({ props }) {
  const { customerData } = useUI();
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
      <h5>{customerData.name}</h5>
      <hr />
      <p>{props.msg}</p>
    </div>
  );
}
