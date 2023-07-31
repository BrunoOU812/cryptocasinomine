import React from "react";
import jkImage from "../../assets/img/games/jk.jpg";
import jk2Image from "../../assets/img/games/jk2.jpg";
import jk4Image from "../../assets/img/games/jk4.jpg";
import jk6Image from "../../assets/img/games/jk6.jpg";
import jk15Image from "../../assets/img/games/jk15.jpg";
import jk14Image from "../../assets/img/games/jk14.jpg";
import jk9Image from "../../assets/img/games/jk9.jpg";
import jk11Image from "../../assets/img/games/jk11.jpg";
import GameItem from "./GameItem";

export default function Games() {
  return (
    <div>
      <div className="row g-0">
        <div className="casino__tab__area">
          <div className="tab-content" id="nav-tabCcasino">
            <div
              className="tab-pane mt__30 pb-80 fade text-white"
              id="casinot8"
              role="tabpanel"
              aria-labelledby="casinot1"
              tabIndex="0"
            ></div>
            <div
              className="tab-pane fade show active text-white mt__30"
              id="casinot7"
              role="tabpanel"
              aria-labelledby="casinot7"
              tabIndex="0"
            >
              <div
                className="common__head mb__30"
                style={{ marginTop: `${20}px` }}
              >
                <span className="icons">
                  <i className="icon-jackpot"></i>
                </span>
                <span>Games</span>
              </div>
              <div className="row g-4 pb-60">
                <GameItem props={{ game: "Dice", img: jkImage }}></GameItem>
                <GameItem props={{ game: "Crash", img: jk2Image }}></GameItem>
                <GameItem props={{ game: "Sports", img: jk4Image }}></GameItem>
                <GameItem props={{ game: "Poker", img: jk6Image }}></GameItem>
                <GameItem
                  props={{ game: "Blackjack", img: jk15Image }}
                ></GameItem>
                <GameItem
                  props={{ game: "Baccarat", img: jk14Image }}
                ></GameItem>
                <GameItem props={{ game: "War", img: jk9Image }}></GameItem>
                <GameItem
                  props={{ game: "Roulette", img: jk11Image }}
                ></GameItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
