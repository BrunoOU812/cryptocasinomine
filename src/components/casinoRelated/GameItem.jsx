import React from "react";
import play from "../../assets/img/games/play.png";
import { Link } from "react-router-dom";

export default function GameItem({ props }) {
  return (
    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 ">
      <div className="casino__box">
        <img src={props.img} alt="game" />
        <div className="casino__overlay">
          <Link to="/casino">
            <img src={play} alt="img" />
          </Link>
        </div>
      </div>
      <span className="h6">{props.game}</span>
    </div>
  );
}
