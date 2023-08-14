import React, { useState } from "react";

export default function Select(props) {
  const [select, setSelect] = useState(false);

  return (
    <div
      className={`nice-select ${select ? "open" : "closed"}`}
      tabIndex="0"
      onClick={() => {
        setSelect((prevState) => !prevState);
      }}
    >
      {props.current}
      <ul className="list">
        {props.array.map((item, i) => {
          return (
            <li
              key={i}
              onClick={item.onClick}
              className={`option selected ${i == 0 ? "focus" : ""}`}
            >
              {item.component}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
