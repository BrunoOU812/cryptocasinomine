import React from "react";

export default function Message() {
  return (
    <div
      className="d-flex my-1"
      style={{
        width: "310px",
        backgroundColor: "rgb(40, 57, 104)",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <p style={{ fontSize: "1em", alignSelf: "center", lineHeight: "1.5" }}>
        <span style={{ fontWeight: "bold" }}>Mia :</span> I had a fantastic
        experience playing roulette here.
      </p>
    </div>
  );
}
