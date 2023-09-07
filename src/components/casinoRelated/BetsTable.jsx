import React, { useEffect, useRef, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
const Bet = ({ props }) => {
  const rowStyle = {
    color: "white",
    backgroundColor: props.index % 2 === 0 ? "#283352" : "",
  };
  return (
    <div
      className="tr"
      // style={rowStyle}
    >
      <div className="td">{props.game}</div>
      <div className="td">{props.user}</div>
      <div className="td">{props.time}</div>
      <div className="td">{props.bet}</div>
      <div className="td">{props.multiplier}</div>
      <div className="td">{props.payout}</div>
    </div>
  );
};
export default function BetsTable() {
  const trHeight = 40;
  const [list, setList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animation, setAnimation] = useState(0);
  const [next, setNext] = useState(0);
  const [duration, setDuration] = useState(1);
  const trQnt = useRef(8);
  const initialBets = [
    {
      game: "Blackjack",
      user: "John",
      time: "2023-07-10 15:30:00",
      bet: 100,
      multiplier: 2.5,
      payout: "U$S 250",
    },
    {
      game: "Roulette",
      user: "Emily",
      time: "2023-07-10 16:45:00",
      bet: 150,
      multiplier: 1.8,
      payout: "U$S 270",
    },
    {
      game: "Slots",
      user: "David",
      time: "2023-07-10 17:15:00",
      bet: 75,
      multiplier: 3.2,
      payout: "U$S 240",
    },
    {
      game: "Poker",
      user: "Sarah",
      time: "2023-07-10 18:00:00",
      bet: 50,
      multiplier: 2.0,
      payout: "U$S 100",
    },
    {
      game: "Baccarat",
      user: "Michael",
      time: "2023-07-10 19:30:00",
      bet: 200,
      multiplier: 1.5,
      payout: "U$S 300",
    },
    {
      game: "Craps",
      user: "Jessica",
      time: "2023-07-10 20:15:00",
      bet: 100,
      multiplier: 2.2,
      payout: "U$S 220",
    },
    {
      game: "Keno",
      user: "Andrew",
      time: "2023-07-10 21:00:00",
      bet: 120,
      multiplier: 1.7,
      payout: "U$S 204",
    },
    {
      game: "Bingo",
      user: "Olivia",
      time: "2023-07-10 22:45:00",
      bet: 80,
      multiplier: 2.8,
      payout: "U$S 224",
    },
    {
      game: "Cricket",
      user: "Daniel",
      time: "2023-07-10 23:30:00",
      bet: 90,
      multiplier: 2.1,
      payout: "U$S 189",
    },
    {
      game: "Video Poker",
      user: "Sophia",
      time: "2023-07-11 00:15:00",
      bet: 110,
      multiplier: 2.3,
      payout: "U$S 253",
    },
    {
      game: "Roulette",
      user: "Alice",
      time: "2023-07-11 08:30:00",
      bet: 60,
      multiplier: 1.5,
      payout: "U$S 90",
    },
    {
      game: "Slots",
      user: "Bob",
      time: "2023-07-11 09:15:00",
      bet: 100,
      multiplier: 3.0,
      payout: "U$S 300",
    },
    {
      game: "Poker",
      user: "Eva",
      time: "2023-07-11 10:00:00",
      bet: 200,
      multiplier: 2.5,
      payout: "U$S 500",
    },
    {
      game: "Baccarat",
      user: "Lucas",
      time: "2023-07-11 11:30:00",
      bet: 150,
      multiplier: 2.0,
      payout: "U$S 300",
    },
    {
      game: "Craps",
      user: "Sophie",
      time: "2023-07-11 12:15:00",
      bet: 50,
      multiplier: 3.5,
      payout: "U$S 175",
    },
    {
      game: "Cricket",
      user: "William",
      time: "2023-07-11 13:00:00",
      bet: 60,
      multiplier: 2.5,
      payout: "U$S 150",
    },
    {
      game: "Video Poker",
      user: "Victoria",
      time: "2023-07-11 13:45:00",
      bet: 80,
      multiplier: 2.2,
      payout: "U$S 176",
    },
    {
      game: "Slots",
      user: "Henry",
      time: "2023-07-11 14:30:00",
      bet: 100,
      multiplier: 1.5,
      payout: "U$S 150",
    },
    {
      game: "Roulette",
      user: "Elizabeth",
      time: "2023-07-11 15:15:00",
      bet: 120,
      multiplier: 2.8,
      payout: "U$S 336",
    },
    {
      game: "Blackjack",
      user: "Alexander",
      time: "2023-07-11 16:00:00",
      bet: 140,
      multiplier: 1.8,
      payout: "U$S 252",
    },
    {
      game: "Baccarat",
      user: "Charlotte",
      time: "2023-07-11 16:45:00",
      bet: 160,
      multiplier: 2.5,
      payout: "U$S 400",
    },
    {
      game: "Poker",
      user: "Daniel",
      time: "2023-07-11 17:30:00",
      bet: 180,
      multiplier: 2.0,
      payout: "U$S 360",
    },
    {
      game: "Craps",
      user: "Emma",
      time: "2023-07-11 18:15:00",
      bet: 200,
      multiplier: 2.2,
      payout: "U$S 440",
    },
    {
      game: "Roulette",
      user: "Liam",
      time: "2023-07-11 19:00:00",
      bet: 220,
      multiplier: 1.5,
      payout: "U$S 330",
    },
    {
      game: "Slots",
      user: "Olivia",
      time: "2023-07-11 19:45:00",
      bet: 240,
      multiplier: 2.8,
      payout: "U$S 672",
    },
    {
      game: "Poker",
      user: "Noah",
      time: "2023-07-11 20:30:00",
      bet: 260,
      multiplier: 2.1,
      payout: "U$S 546",
    },
    {
      game: "Slots",
      user: "Ava",
      time: "2023-07-11 21:00:00",
      bet: 280,
      multiplier: 1.8,
      payout: "U$S 504",
    },
    {
      game: "Roulette",
      user: "William",
      time: "2023-07-11 21:30:00",
      bet: 300,
      multiplier: 2.5,
      payout: "U$S 750",
    },
    {
      game: "Blackjack",
      user: "Mia",
      time: "2023-07-11 22:00:00",
      bet: 320,
      multiplier: 1.7,
      payout: "U$S 544",
    },
    {
      game: "Baccarat",
      user: "Liam",
      time: "2023-07-11 22:30:00",
      bet: 340,
      multiplier: 2.3,
      payout: "U$S 782",
    },
    {
      game: "Craps",
      user: "Emma",
      time: "2023-07-11 23:00:00",
      bet: 360,
      multiplier: 1.5,
      payout: "U$S 540",
    },
    {
      game: "Roulette",
      user: "Oliver",
      time: "2023-07-11 23:30:00",
      bet: 380,
      multiplier: 2.8,
      payout: "U$S 1064",
    },
    {
      game: "Slots",
      user: "Sophia",
      time: "2023-07-12 00:00:00",
      bet: 400,
      multiplier: 1.5,
      payout: "U$S 600",
    },
    {
      game: "Blackjack",
      user: "Jackson",
      time: "2023-07-12 00:30:00",
      bet: 420,
      multiplier: 2.2,
      payout: "U$S 924",
    },
    {
      game: "Poker",
      user: "Amelia",
      time: "2023-07-12 01:00:00",
      bet: 440,
      multiplier: 1.6,
      payout: "U$S 704",
    },
    {
      game: "Baccarat",
      user: "Lucas",
      time: "2023-07-12 01:30:00",
      bet: 460,
      multiplier: 2.5,
      payout: "U$S 1150",
    },
    {
      game: "Craps",
      user: "Isabella",
      time: "2023-07-12 02:00:00",
      bet: 480,
      multiplier: 1.7,
      payout: "U$S 816",
    },
    {
      game: "Roulette",
      user: "Jack",
      time: "2023-07-12 02:30:00",
      bet: 500,
      multiplier: 2.3,
      payout: "U$S 1150",
    },
    {
      game: "Slots",
      user: "Sophia",
      time: "2023-07-12 03:00:00",
      bet: 520,
      multiplier: 1.5,
      payout: "U$S 780",
    },
    {
      game: "Blackjack",
      user: "Ethan",
      time: "2023-07-12 03:30:00",
      bet: 540,
      multiplier: 2.2,
      payout: "U$S 1188",
    },
  ];
  const trQntChanger = () => {
    const rnd = () => Math.floor(Math.random() * 8);
    let even = false;
    do {
      trQnt.current = rnd();
      even = trQnt.current > 0 ? trQnt.current % 2 === 0 : false;
    } while (!even);
  };
  useEffect(() => {
    setDataList(
      initialBets
        .filter((item, i) => {
          return i <= 8 ? item : false;
        })
        .map((item, i) => {
          return (
            <Bet
              key={i}
              props={{
                game: item.game,
                user: item.user,
                time: item.time,
                bet: item.bet,
                multiplier: item.multiplier,
                payout: item.payout,
                index: i,
              }}
            />
          );
        })
    );
  }, []);
  useEffect(() => {
    trQntChanger();
    setList(
      initialBets
        .filter((item, i) => {
          return i < trQnt.current ? item : false;
        })
        .map((item, i) => {
          return (
            <Bet
              key={i}
              props={{
                game: item.game,
                user: item.user,
                time: item.time,
                bet: item.bet,
                multiplier: item.multiplier,
                payout: item.payout,
                index: i,
              }}
            />
          );
        })
    );
    setTimeout(() => {
      setIsAnimated(true);
      setAnimation(trQnt.current * trHeight);
    }, 500);
    setTimeout(() => {
      setNext((prevState) => prevState + 1);
    }, 1200);
  }, []);

  useEffect(() => {
    if (next > 0) {
      setTimeout(() => {
        const updateDataList = [...dataList];
        list.forEach((_) => {
          updateDataList.pop();
        });

        setDataList([...list, ...updateDataList]);
        setDuration(0);
        setIsAnimated(false);
        setAnimation(0);
      }, 300);
    }
  }, [next]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <style>
            {`
#tbody {
    position: relative;
    --transition-duration: ${duration}s; /* Definir la duración de la transición en una variable */
transition: transform var(--transition-duration) ease-in-out; /* Usar la variable en la propiedad transition */
transform: translateY(${animation}px); /* Aplicar animación cuando isAnimated sea true */
    }

.animate-down {
    transform: translateY(var(--translate-y, 200px));
    }
#divBelowTbody {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    }
.tr{
    color:white;
    display: flex;
    justify-content: space-between;
    border-radius: 5px ;
}
.td{
    width: 200px;
}
.table-striped #tbody .tr:nth-of-type(odd) {
    color: white;
  background-color: #283352; /* Color de fondo para las filas impares */
}

.table-striped #tbody .tr:nth-of-type(even) {
  background-color: transparent; /* Color de fondo para las filas pares */
}
.table-striped #thead .tr {
    background-color: transparent; /* Color de fondo para las filas impares */
}
.table-striped #thead {
    border-color: transparent;
}
.table-striped #tbody .tr  {
    height: 40px;
    border-top: none;
    border-bottom: none;
}
.table-striped #tbody .tr:nth-child(odd) .td {
    color: #fff; /* Color de letra para las filas impares */
}
.table-striped #tbody .tr .td {
    color: #fff; /* Color de letra para las filas impares */
    border-top: none;
    border-bottom: none;
}
.table-striped #divBelowTbody .tr:nth-of-type(odd) {
color: white;
background-color: #283352; /* Color de fondo para las filas impares */
}

.table-striped #divBelowTbody .tr:nth-of-type(even) {
background-color: transparent; /* Color de fondo para las filas pares */
}
.table-striped #divBelowTbody .tr  {
height: 40px;
border-top: none;
border-bottom: none;
}
.table-striped #divBelowTbody .tr:nth-child(odd) .td {
color: #fff; /* Color de letra para las filas impares */
}
.table-striped #divBelowTbody .tr .td {
color: #fff; /* Color de letra para las filas impares */
border-top: none;
border-bottom: none;
}
.varyWidth {
transition: width 0.5s ease-in-out; /* Ajusta la duración y la función de tiempo según tus necesidades */
}
#toggle-button {
transition: right 0.5s ease-in-out; /* Ajusta la duración y la función de tiempo según tus necesidades */
}`}
          </style>
        </Helmet>
      </HelmetProvider>
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
            <div id="tbody" style={{ zIndex: "2" }}>
              {dataList}
            </div>
            <div id="divBelowTbody" style={{ zIndex: "1" }}>
              {list}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
