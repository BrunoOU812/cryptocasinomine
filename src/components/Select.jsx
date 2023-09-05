import React, { useState, useEffect, useRef } from "react";

export default function Select(props) {
  const [select, setSelect] = useState(false);
  const selectRef = useRef(null);
  useEffect(() => {
    const closeSelectOnOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelect(false);
      }
    };

    document.addEventListener("click", closeSelectOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeSelectOnOutsideClick);
    };
  }, []);
  return (
    <div
      className={`nice-select ${select ? "open" : "closed"}`}
      tabIndex="0"
      onClick={() => {
        setSelect((prevState) => !prevState);
      }}
      ref={selectRef}
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
