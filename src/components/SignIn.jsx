import React, { useEffect, useState } from "react";
import { useUI } from "../contexts/UIContext";
import Login from "./Login";
import Register from "./Register";
export default function SignIn() {
  const { showLogin } = useUI();

  return (
    <div className="container">
      <div className="row g-100 my-4" style={{ flexWrap: "wrap" }}>
        {showLogin ? <Register /> : <Login />}
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "2vw",
            minHeight: "80vh",
          }}
        ></div>
      </div>
    </div>
  );
}
