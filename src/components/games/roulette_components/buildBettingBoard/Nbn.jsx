import React from "react";

export default function Nbn(props) {
  return (
    <div
      className="nbn"
      style={
        !(props.nbClass === "2 to 1")
          ? { fontSize: "1.1rem" }
          : {
              fontSize: "1rem",
            }
      }
    >
      {props.children}
    </div>
  );
}
