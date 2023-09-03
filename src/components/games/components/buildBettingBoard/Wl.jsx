import React from "react";
import Wlttb from "./Wlttb";
import Wlrtl from "./Wlrtl";
import Rtlbb from "./Rtlbb";
import Wlcb from "./Wlcb";
import Cbbb from "./Cbbb";
import HalfRowBlock from "./HalfRowBlock";
import RowBlock from "./RowBlock";
import HalfH1 from "./HalfH1";
import HalfH2 from "./HalfH2";
import styles from "../assets/styles.module.scss";
export default function Wl() {
  return (
    <div className="winning_lines">
      <Wlttb id={styles[`wlttb_top`]}>
        {Array(11)
          .fill()
          .map((_, i) => {
            return <HalfRowBlock key={i} index={i} />;
          })}
      </Wlttb>
      {Array(3)
        .fill()
        .map((_, c) => {
          let d = c;
          return (
            <Wlttb key={c} id={styles[`wlttb_${c + 1}`]}>
              {Array(12)
                .fill()
                .map((_, i) => {
                  return c === 2 ? (
                    <RowBlock key={i} index={i} />
                  ) : c === 1 ? (
                    <HalfH1 key={i} index={i} wlttbIndex={c} />
                  ) : (
                    <HalfH2 key={i} index={i} wlttbIndex={c} />
                  );
                })}
            </Wlttb>
          );
        })}
      {Array(11)
        .fill()
        .map((_, c) => {
          let d = c;
          return (
            <Wlrtl key={c} id={`wlrtl_${c + 1}`}>
              {Array(3)
                .fill()
                .map((_, i) => {
                  return <Rtlbb key={i} index={i} compIndex={c} />;
                })}
            </Wlrtl>
          );
        })}
      {Array(2)
        .fill()
        .map((_, c) => {
          return (
            <Wlcb key={c} index={c}>
              {Array(11)
                .fill()
                .map((_, i) => {
                  return <Cbbb key={i} index={i} wlcbIndex={c} />;
                })}
            </Wlcb>
          );
        })}
    </div>
  );
}
