import React from "react";

export default function BetsTable() {
  return (
    <div>
      <div
        className="casino__bet__container"
        style={{
          height: "410px",
          overflow: "hidden",
          marginTop: "5vh",
          marginBottom: "15vh",
        }}
      >
        <div
          className="h4 d-flex align-content-center border-bottom text-white"
          style={{ color: "white", height: "40px" }}
        >
          <span className="border-bottom text-white">All Bets</span>
        </div>
        <div className="table table-striped">
          <div id="thead">
            <div className="tr">
              <div className="td" style={{ fontWeight: "bold" }}>
                Game
              </div>
              <div className="td" style={{ fontWeight: "bold" }}>
                User
              </div>
              <div className="td" style={{ fontWeight: "bold" }}>
                Time
              </div>
              <div className="td" style={{ fontWeight: "bold" }}>
                Bet
              </div>
              <div className="td" style={{ fontWeight: "bold" }}>
                Multiplier
              </div>
              <div className="td" style={{ fontWeight: "bold" }}>
                Payout
              </div>
            </div>
          </div>
          <div id="tableContainer" style={{ position: "relative" }}>
            <div id="tbody">
              <div className="tr">
                <div className="td">Video Poker</div>
                <div className="td">Victoria</div>
                <div className="td">2023-07-11 13:45:00</div>
                <div className="td">80</div>
                <div className="td">2.2</div>
                <div className="td">U$S 176</div>
              </div>
              <div className="tr">
                <div className="td">Cricket</div>
                <div className="td">William</div>
                <div className="td">2023-07-11 13:00:00</div>
                <div className="td">60</div>
                <div className="td">2.5</div>
                <div className="td">U$S 150</div>
              </div>
              <div className="tr">
                <div className="td">Craps</div>
                <div className="td">Sophie</div>
                <div className="td">2023-07-11 12:15:00</div>
                <div className="td">50</div>
                <div className="td">3.5</div>
                <div className="td">U$S 175</div>
              </div>
              <div className="tr">
                <div className="td">Baccarat</div>
                <div className="td">Lucas</div>
                <div className="td">2023-07-11 11:30:00</div>
                <div className="td">150</div>
                <div className="td">2</div>
                <div className="td">U$S 300</div>
              </div>
              <div className="tr">
                <div className="td">Poker</div>
                <div className="td">Eva</div>
                <div className="td">2023-07-11 10:00:00</div>
                <div className="td">200</div>
                <div className="td">2.5</div>
                <div className="td">U$S 500</div>
              </div>
              <div className="tr">
                <div className="td">Slots</div>
                <div className="td">Bob</div>
                <div className="td">2023-07-11 09:15:00</div>
                <div className="td">100</div>
                <div className="td">3</div>
                <div className="td">U$S 300</div>
              </div>
              <div className="tr">
                <div className="td">Roulette</div>
                <div className="td">Alice</div>
                <div className="td">2023-07-11 08:30:00</div>
                <div className="td">60</div>
                <div className="td">1.5</div>
                <div className="td">U$S 90</div>
              </div>
              <div className="tr">
                <div className="td">Video Poker</div>
                <div className="td">Sophia</div>
                <div className="td">2023-07-11 00:15:00</div>
                <div className="td">110</div>
                <div className="td">2.3</div>
                <div className="td">U$S 253</div>
              </div>
            </div>
            <div id="divBelowTbody" style={{ zIndex: "-1" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
