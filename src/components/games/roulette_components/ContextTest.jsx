import React, { useState, useEffect, useContext, createContext } from "react";
export const CasinoContext = createContext();
export const useCasino = () => {
  return useContext(CasinoContext);
};
// Si la apuesta se gana se le devuelve lo apostado al jugador junto con la recompensa que es un numero que multiplica la apuesta es decir se paga X cantidad de veces
// Numero se paga 35 veces
// Medio, se paga 17 veces
// transversal o calle se juegan los 3 numeros seguidos que constituyen una fila y se paga 11 veces
// cuadro, es una esquina osea es un vertice compartido por 4 numeros se paga 8 veces
// linea esto es como un medio transversal o media calle en vez de 3 numeros seguidos son 6 se paga 5 veces
//linea especial o secta no lo contempla, pero seria la esquina entre el 0 y el transversal medio de 123, se pagaria 6 veces
// la docena se paga 2 veces
// columna se paga 2 veces
// par o impar tanto como color se paga 1 vez

export default function ContextProvider({ children }) {
  const rules = {
    each: 36,
    half: 17,
    row: 11,
    quarter: 8,
    halfRow: 5,
    dozen: 2,
    column: 2,
    color: 2,
  };
  const [bankValue, setBankValue] = useState(1000);
  const [currentBet, setCurrentBet] = useState(0);
  const [wager, setWager] = useState(5);
  const [lastWager, setLastWager] = useState(0);
  const [bet, setBetValue] = useState([]);
  const [numbersBet, setNumbersBet] = useState([]);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [bankSpan, setBankSpan] = useState(1000);
  const [betSpan, setBetSpan] = useState(0);
  const [chipValues, setChipValues] = useState(["1", "5", "10", "100"]);
  const [spinBtnValue, setSpinBtn] = useState(true);
  const [spin, setSpin] = useState(false);
  const [chipActive, setChipActive] = useState([
    false,
    true,
    false,
    false,
    false,
  ]);
  const [zeroPlay, setZeroPlay] = useState({});
  const [eachPlay, setEachPlay] = useState({});
  const [otoPlay, setOtoPlay] = useState({});
  const [ttbPlay, setTtbPlay] = useState({});
  const [bo3Play, setBo3Play] = useState({});
  const [rowPlay, setRowPlay] = useState({});
  const [ttbbetPlay, setTtbbetPlay] = useState({});
  const [quarter1Play, setQuarter1Play] = useState({});
  const [quarter2Play, setQuarter2Play] = useState({});
  const [halfH1Play, sethalfH1Play] = useState({});
  const [halfH2Play, sethalfH2Play] = useState({});
  const [halfV1Play, sethalfV1Play] = useState({});
  const [halfV2Play, sethalfV2Play] = useState({});
  const [halfV3Play, sethalfV3Play] = useState({});
  const [halfBoard1Play, setHalfBoard1Play] = useState({});
  const [halfBoard2Play, setHalfBoard2Play] = useState({});
  // const [plays, setPlays] = useState([]);
  const [winningNumber, setWinningNumber] = useState(null);
  const [clear, clearBet] = useState(false);
  const numRed = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  const wheelnumbersAC = [
    0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10,
    23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32,
  ];
  const [each, setEach] = useState([]);
  const [column, setColumn] = useState([]);
  const [dozen, setDozen] = useState([]);
  const [halfRow, setHalfRow] = useState([]);
  const [row, setRow] = useState([]);
  const [quarter1, setQuarter1] = useState([]);
  const [quarter2, setQuarter2] = useState([]);
  const [halfH1, setHalfH1] = useState([]);
  const [halfH2, setHalfH2] = useState([]);
  const [halfV1, setHalfV1] = useState([]);
  const [halfV2, setHalfV2] = useState([]);
  const [halfV3, setHalfV3] = useState([]);
  const [halfBoard1, setHalfBoard1] = useState([]);
  const [halfBoard2, setHalfBoard2] = useState([]);

  const winArrays = {
    eachNumbers: Array(36)
      .fill()
      .map((_, i) => i + 1),
    columnNumbers: () => {
      return [1, 2, 3].map((num) => {
        return Array(12)
          .fill()
          .map((_, i) => (i === 0 ? num : num + i * 3));
      });
    },
    dozenNumbers: [1, 13, 25].map((num) =>
      Array(12)
        .fill()
        .map((_, i) => num + i)
    ),
    halfNumbersHorizontal: () => {
      return Array(37)
        .fill()
        .map((_, i) => i)
        .map((num, i, arr) => {
          if (num > 0 && num <= 36 && !(num % 3 === 0)) {
            return [num, arr[i + 1]];
          }
        })
        .filter((array) => array !== undefined);
    },

    halfNumbersVertical: () => {
      const columnNumbers = winArrays.columnNumbers();
      return [...columnNumbers[0], ...columnNumbers[1], ...columnNumbers[2]]
        .map((num, i, arr) => {
          if (!(num > arr[i + 1]) && arr[i + 1] <= 36) {
            return [num, arr[i + 1]];
          }
        })
        .filter((array) => array !== undefined);
    },

    rowNumbers: () => {
      const columnNumbers = winArrays.columnNumbers();
      return [...columnNumbers[0]].map((num) => {
        return [num, num + 1, num + 2];
      });
    },
    halfRowNumbers: () => {
      const rowNumbers = winArrays.rowNumbers();
      return rowNumbers
        .map((array, i, arr) => {
          if (i + 1 < arr.length) {
            return [...array, ...arr[i + 1]];
          }
        })
        .filter((arr) => arr != undefined);
    },
    quarterNumbers: () => {
      const rowNumbers = winArrays.rowNumbers();
      let quarterNumbers = [];
      rowNumbers.forEach((array, i, arr) => {
        array.forEach((value, j, arrJ) => {
          const nextValue = arrJ[j + 1];
          const nextRowValue = arr[i + 1] ? arr[i + 1][j] : undefined;
          const nextRowNextValue = arr[i + 1] ? arr[i + 1][j + 1] : undefined;

          if (
            nextValue !== undefined &&
            nextRowValue !== undefined &&
            nextRowNextValue !== undefined
          ) {
            quarterNumbers.push([
              value,
              nextValue,
              nextRowValue,
              nextRowNextValue,
            ]);
          }
        });
      });
      return quarterNumbers;
    },
    quarterNumbers2: () => {
      return winArrays.quarterNumbers().filter((item, i) => {
        return i % 2 === 0 ? item : false;
      });
    },
    quarterNumbers1: () => {
      return winArrays.quarterNumbers().filter((item, i) => {
        return i % 2 === 0 ? false : item;
      });
    },
    halfNumbersH1: () => {
      return winArrays.halfNumbersHorizontal().filter((item, i) => {
        return i % 2 === 0 ? item : i === 0 ? item : false;
      });
    },
    halfNumbersH2: () => {
      return winArrays.halfNumbersHorizontal().filter((item, i) => {
        return i % 2 === 0 ? false : item;
      });
    },
    halfNumbersV3: () => {
      return winArrays.halfNumbersVertical().filter((item, i) => {
        return i < 11 ? item : false;
      });
    },
    halfNumbersV2: () => {
      return winArrays.halfNumbersVertical().filter((item, i) => {
        return i >= 11 && i < 22 ? item : false;
      });
    },
    halfNumbersV1: () => {
      return winArrays.halfNumbersVertical().filter((item, i) => {
        return i >= 22 ? item : false;
      });
    },
    HalfBoard1: () => {
      return winArrays.eachNumbers.filter((item, i) => {
        return i < 18 ? item : false;
      });
    },
    HalfBoard2: () => {
      return winArrays.eachNumbers.filter((item, i) => {
        return i < 18 ? false : item;
      });
    },
  };

  useEffect(() => {
    setEach(winArrays.eachNumbers);
    setColumn(winArrays.columnNumbers().reverse());
    setDozen(winArrays.dozenNumbers);
    setHalfRow(winArrays.halfRowNumbers());
    setQuarter1(winArrays.quarterNumbers1());
    setQuarter2(winArrays.quarterNumbers2());
    setHalfH1(winArrays.halfNumbersH1());
    setHalfH2(winArrays.halfNumbersH2());
    setHalfV1(winArrays.halfNumbersV1());
    setHalfV2(winArrays.halfNumbersV2());
    setHalfV3(winArrays.halfNumbersV3());
    setRow(winArrays.rowNumbers());
    setHalfBoard1(winArrays.HalfBoard1());
    setHalfBoard2(winArrays.HalfBoard2());
  }, [spin]);

  useEffect(() => {
    if (clear) {
      clearBet(false);
    }
  }, [clear]);

  useEffect(() => {
    if (currentBet > 0) {
      setSpinBtn(true);
    }
  }, [currentBet]);

  const startBetPlays = (lastWinningNumber) => {
    const plays = [];
    numRed.includes(lastWinningNumber)
      ? plays.push("RED")
      : plays.push("BLACK");
    lastWinningNumber % 2 === 0 ? plays.push("EVEN") : plays.push("ODD");
    const playGroups = [
      { array: column, prefix: "COLUMN", index: 2 },
      { array: dozen, prefix: "DOZEN", index: 2 },
      { array: halfRow, prefix: "HALFROW", index: 10 },
      { array: row, prefix: "ROW", index: 11 },
      { array: quarter1, prefix: "QUARTER1", index: 10 },
      { array: quarter2, prefix: "QUARTER2", index: 10 },
      { array: halfH1, prefix: "HALFH1", index: 11 },
      { array: halfH2, prefix: "HALFH2", index: 11 },
      { array: halfV1, prefix: "HALFV1", index: 10 },
      { array: halfV2, prefix: "HALFV2", index: 10 },
      { array: halfV3, prefix: "HALFV3", index: 10 },
    ];
    for (let play of playGroups) {
      for (let i = 0; i <= play.index; i++) {
        play.array[i].includes(lastWinningNumber) &&
          plays.push(`${play.prefix}_${i}`);
      }
    }
    for (let i = 0; i <= each.length - 1; i++) {
      i === lastWinningNumber && plays.push(`EACH_${i}`);
    }
    for (let i = 0; i <= halfBoard1.length - 1; i++) {
      halfBoard1.includes(lastWinningNumber) && plays.push(`HALFBOARD1_${i}`);
    }
    for (let i = 0; i <= halfBoard2.length - 1; i++) {
      halfBoard2.includes(lastWinningNumber) && plays.push(`HALFBOARD2_${i}`);
    }
    0 === lastWinningNumber && plays.push(`ZERO_0`);
    return plays;
  };
  const setWinningPlays = (plays) => {
    console.log(plays);
    console.log(
      zeroPlay,
      eachPlay,
      otoPlay,
      ttbPlay,
      bo3Play,
      rowPlay,
      quarter1Play,
      quarter2Play,
      halfH1Play,
      halfH2Play,
      halfV1Play,
      halfV2Play,
      halfV3Play,
      halfBoard1Play,
      halfBoard2Play
    );
    const verifyPlay = [
      { vrbl: zeroPlay, fnct: setZeroPlay, bet: rules.each },
      { vrbl: eachPlay, fnct: setEachPlay, bet: rules.each },
      { vrbl: otoPlay, fnct: setOtoPlay, bet: rules.color },
      { vrbl: ttbPlay, fnct: setTtbPlay, bet: rules.each },
      { vrbl: bo3Play, fnct: setBo3Play, bet: rules.dozen },
      // { vrbl: ttbbetPlay, fnct: setTtbbetPlay, bet: rules.each },
      { vrbl: rowPlay, fnct: setRowPlay, bet: rules.row },
      { vrbl: quarter1Play, fnct: setQuarter1Play, bet: rules.quarter },
      { vrbl: quarter2Play, fnct: setQuarter2Play, bet: rules.quarter },
      { vrbl: halfH1Play, fnct: sethalfH1Play, bet: rules.half },
      { vrbl: halfH2Play, fnct: sethalfH2Play, bet: rules.half },
      { vrbl: halfV1Play, fnct: sethalfV1Play, bet: rules.half },
      { vrbl: halfV2Play, fnct: sethalfV2Play, bet: rules.half },
      { vrbl: halfV3Play, fnct: sethalfV3Play, bet: rules.half },
      { vrbl: halfBoard1Play, fnct: setHalfBoard1Play, bet: rules.color },
      { vrbl: halfBoard2Play, fnct: setHalfBoard2Play, bet: rules.color },
    ];
    verifyPlay.forEach(({ vrbl, fnct, bet }) => {
      Object.keys(vrbl).forEach((value) => {
        if (plays.includes(value) && vrbl[value] > 0) {
          setBankValue((prevState) => prevState + vrbl[value] * bet);
        }
      });
    });

    verifyPlay.forEach(({ vrbl, fnct }) => {
      Object.keys(vrbl).forEach((_) => fnct({}));
    });
    setCurrentBet(0);
    // setPlays([]);
  };

  const setBet = ({ chip, setChip, setChipValue }) => {
    if (!spin) {
      setBankValue((prevState) => prevState - wager);
      setCurrentBet((prevState) => prevState + wager);
      if (chip) {
        setChipValue((prevState) => prevState + wager);
      } else {
        setChipValue(wager);
        setChip(true);
      }
    }
  };
  const removeBet = ({
    e: e,
    chipValue: chipValue,
    setChipValue: setChipValue,
  }) => {
    if (!spin) {
      e.preventDefault();
      if (chipValue > 0) {
        if (chipValue > wager) {
          setBankValue((prevState) => prevState + wager);
          setCurrentBet((prevState) => prevState - wager);
          setChipValue((prevState) => prevState - wager);
        } else {
          setBankValue((prevState) => prevState + chipValue);
          setCurrentBet((prevState) => prevState - chipValue);
          setChipValue(0);
        }
      }
    }
  };
  const casinoContextvalues = {
    bankValue,
    setBankValue,
    currentBet,
    setCurrentBet,
    wager,
    setWager,
    lastWager,
    setLastWager,
    bet,
    setBetValue,
    numbersBet,
    setNumbersBet,
    previousNumbers,
    setPreviousNumbers,
    numRed,
    wheelnumbersAC,
    bankSpan,
    setBankSpan,
    betSpan,
    setBetSpan,
    spinBtnValue,
    setSpinBtn,
    chipValues,
    setChipValues,
    chipActive,
    setChipActive,
    clear,
    clearBet,
    spin,
    setSpin,
    setBet,
    removeBet,
    winArrays,
    otoPlay,
    setOtoPlay,
    winningNumber,
    setWinningNumber,
    ttbPlay,
    setTtbPlay,
    setBo3Play,
    setTtbbetPlay,
    setRowPlay,
    sethalfH1Play,
    sethalfH2Play,
    sethalfV1Play,
    sethalfV2Play,
    sethalfV3Play,
    setEachPlay,
    setZeroPlay,
    setQuarter1Play,
    setQuarter2Play,
    setHalfBoard1Play,
    setHalfBoard2Play,
    startBetPlays,
    setWinningPlays,
  };
  return (
    <CasinoContext.Provider value={casinoContextvalues}>
      {children}
    </CasinoContext.Provider>
  );
}
