import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ConfirmDepositMsg({ depositResponse }) {
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
      <h5>Test User</h5>
      <hr />
      <p>
        {depositResponse.comment && depositResponse.comment}
        {depositResponse.comment && <br />}
        {depositResponse.comment && <br />}
        <span style={{ fontWeight: "bold" }}>To:&nbsp;</span>{" "}
        {depositResponse.to},
        <br />
        <span style={{ fontWeight: "bold" }}>Value:&nbsp;</span> $
        {depositResponse.value}
        ,
        <br /> <span style={{ fontWeight: "bold" }}>Datetime:&nbsp;</span>{" "}
        {depositResponse.datetime}, <br />{" "}
        <span style={{ fontWeight: "bold" }}>Status:&nbsp;</span>{" "}
        {depositResponse.status},
      </p>
    </div>
  );
}
