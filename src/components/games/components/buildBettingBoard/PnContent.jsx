import React, { useState, useRef, useEffect } from "react";
import { useCasino } from "../Context";

export default function PnContent(props) {
  const { previousNumbers } = useCasino();
  const scrollContainerRef = useRef(null);
  const numRed = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    }
  }, [previousNumbers]);

  const handleWheel = (e) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      id="pnContent"
      onWheel={handleWheel}
      style={{
        overflowX: "hidden",
      }}
      ref={scrollContainerRef}
    >
      {previousNumbers.map((item) => (
        <span
          key={item}
          className={
            item === 0 ? "pnGreen" : numRed.includes(item) ? "pnRed" : "pnBlack"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}
