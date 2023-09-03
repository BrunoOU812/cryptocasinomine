import React from "react";
import Zero from "./Zero";
import Nbnz from "./Nbnz";
import NumberBlock from "./NumberBlock";
import Nbn from "./Nbn";
import { useCasino } from "../Context";
import { v4 } from "uuid";
import styles from "../assets/styles.module.scss";
export default function NumberBoard(props) {
  const { setBet, removeBet, uuidv4 } = useCasino();
  let ttbIndex = -1;
  return (
    <div className={styles["number_board"]}>
      {" "}
      <Zero>
        <Nbnz>{0}</Nbnz>
      </Zero>
      {[
        3,
        6,
        9,
        12,
        15,
        18,
        21,
        24,
        27,
        30,
        33,
        36,
        "2 to 1",
        2,
        5,
        8,
        11,
        14,
        17,
        20,
        23,
        26,
        29,
        32,
        35,
        "2 to 1",
        1,
        4,
        7,
        10,
        13,
        16,
        19,
        22,
        25,
        28,
        31,
        34,
        "2 to 1",
      ].map((num, i) => {
        let a = i;
        let redBlocks = [
          1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
        ];
        let nbClass = num == "2 to 1" ? "tt1_block" : "number_block";
        if (nbClass === "tt1_block") {
          ttbIndex++;
        }
        let colourClass = redBlocks.includes(num)
          ? "redNum"
          : nbClass == "number_block"
          ? "blackNum"
          : "";
        const key = v4();
        return (
          <NumberBlock
            key={`numberBlock${i}`}
            className1={[`${styles[`${nbClass}`]}`]}
            className2={[`${styles[`${colourClass}`]}`]}
            ttbIndex={ttbIndex}
            num={num}
            nbClass={nbClass}
          >
            <Nbn>{num}</Nbn>
          </NumberBlock>
        );
      })}
    </div>
  );
}
