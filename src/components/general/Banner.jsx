import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";

export default function Casino() {
  return (
    <Container>
      <div
        style={{
          position: "relative",
          maxWidth: "100%",
          maxHeight: "600px",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h1>Welcome to the Casino</h1>
          <p style={{ marginBottom: "20px" }}>
            Enjoy a world of excitement and rewards
          </p>
          <Link
            style={{
              backgroundColor: "orange",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "18px",
            }}
            to={"/"}
          >
            Get Started
          </Link>
        </div>
      </div>
    </Container>
  );
}
