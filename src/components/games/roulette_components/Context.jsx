import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import { useUI } from "../../../contexts/UIContext";
import axios from "axios";
import { API_BASE_URL } from "../../../apiConfig";
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
  const { customerData, setTotalAmount } = useUI();
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
  const [updateBank, setUpdateBank] = useState(false);
  const [bankValue, setBankValue] = useState(0);
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
  // const [plays, setPlays] = useState([]);
  const bank = useRef(0);
  const plays = useRef([]);
  const zeroPlay = useRef({});
  const eachPlay = useRef({});
  const otoPlay = useRef({});
  const ttbPlay = useRef({});
  const bo3Play = useRef({});
  const rowPlay = useRef({});
  const ttbbetPlay = useRef({});
  const quarter1Play = useRef({});
  const quarter2Play = useRef({});
  const halfH1Play = useRef({});
  const halfH2Play = useRef({});
  const halfV1Play = useRef({});
  const halfV2Play = useRef({});
  const halfV3Play = useRef({});
  const halfBoard1Play = useRef({});
  const halfBoard2Play = useRef({});
  // const [winningNumber, setWinningNumber] = useState(null);
  const winningNumber = useRef(null);
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

  const resetPlayVariables = () => {
    zeroPlay.current = {};
    eachPlay.current = {};
    otoPlay.current = {};
    ttbPlay.current = {};
    bo3Play.current = {};
    rowPlay.current = {};
    ttbbetPlay.current = {};
    quarter1Play.current = {};
    quarter2Play.current = {};
    halfH1Play.current = {};
    halfH2Play.current = {};
    halfV1Play.current = {};
    halfV2Play.current = {};
    halfV3Play.current = {};
    halfBoard1Play.current = {};
    halfBoard2Play.current = {};
  };

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
    if (bank.current === 0) {
      bank.current = customerData.tokens;
      setBankValue(bank.current);
    }
  }, []);

  useEffect(() => {
    if (previousNumbers.length > 0) {
      async function fetchData() {
        const modifiedCustomerData = {
          id: customerData.id,
          name: customerData.name,
          email: customerData.email,
          status: customerData.status,
          muted: customerData.muted,
          tokens: bank.current,
        };
        try {
          await axios.put(
            `${API_BASE_URL}/api/customers/${customerData.id}`,
            modifiedCustomerData
          );
        } catch (error) {
          console.error("Error al actualizar datos del cliente:", error);
        }
      }
      fetchData();
    }
  }, [bank.current, spin]);
  useEffect(() => {
    setBankValue(bank.current);
  }, [updateBank]);
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

  useEffect(() => {
    if (winningNumber.current !== null) {
      numRed.includes(winningNumber.current)
        ? plays.current.push("RED")
        : plays.current.push("BLACK");
      winningNumber.current % 2 === 0
        ? plays.current.push("EVEN")
        : plays.current.push("ODD");
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
          play.array[i].includes(winningNumber.current) &&
            plays.current.push(`${play.prefix}_${i}`);
        }
      }
      for (let i = 0; i <= each.length - 1; i++) {
        i === winningNumber.current && plays.current.push(`EACH_${i}`);
      }
      for (let i = 0; i <= halfBoard1.length - 1; i++) {
        halfBoard1.includes(winningNumber.current) &&
          plays.current.push(`HALFBOARD1_${i}`);
      }
      for (let i = 0; i <= halfBoard2.length - 1; i++) {
        halfBoard2.includes(winningNumber.current) &&
          plays.current.push(`HALFBOARD2_${i}`);
      }
      0 === winningNumber.current && plays.current.push(`ZERO_0`);
    }
  }, [winningNumber.current]);

  useEffect(() => {
    if (plays.current.length > 0) {
      console.log("plays", plays.current);
      console.log(
        "Apuestas!",
        "zeroPlay",
        zeroPlay.current,
        "eachPlay",
        eachPlay.current,
        "otoPlay",
        otoPlay.current,
        "ttbPlay",
        ttbPlay.current,
        "bo3Play",
        bo3Play.current,
        "rowPlay",
        rowPlay.current,
        "quarter1Play",
        quarter1Play.current,
        "quarter2Play",
        quarter2Play.current,
        "halfH1Play",
        halfH1Play.current,
        "halfH2Play",
        halfH2Play.current,
        "halfV1Play",
        halfV1Play.current,
        "halfV2Play",
        halfV2Play.current,
        "halfV3Play",
        halfV3Play.current,
        "halfBoard1Play",
        halfBoard1Play.current,
        "halfBoard2Play",
        halfBoard2Play.current
      );
      const verifyPlay = [
        { vrbl: zeroPlay, bet: rules.each },
        { vrbl: eachPlay, bet: rules.each },
        { vrbl: otoPlay, bet: rules.color },
        { vrbl: ttbPlay, bet: rules.column },
        { vrbl: ttbbetPlay, bet: rules.halfRow },
        { vrbl: bo3Play, bet: rules.dozen },
        { vrbl: rowPlay, bet: rules.row },
        { vrbl: quarter1Play, bet: rules.quarter },
        { vrbl: quarter2Play, bet: rules.quarter },
        { vrbl: halfH1Play, bet: rules.half },
        { vrbl: halfH2Play, bet: rules.half },
        { vrbl: halfV1Play, bet: rules.half },
        { vrbl: halfV2Play, bet: rules.half },
        { vrbl: halfV3Play, bet: rules.half },
        { vrbl: halfBoard1Play, bet: rules.color },
        { vrbl: halfBoard2Play, bet: rules.color },
      ];
      verifyPlay.forEach(({ vrbl, bet }) => {
        Object.keys(vrbl.current).forEach((value) => {
          if (plays.current.includes(value) && vrbl.current[value] > 0) {
            console.log(
              "Apuesta ganadora: ",
              value,
              "cobra",
              vrbl.current[value] * bet,
              "banco",
              bank.current + vrbl.current[value] * bet
            );
            bank.current = bank.current + vrbl.current[value] * bet;
          }
        });
      });
      plays.current = [];
      bank.current = bank.current - currentBet;
      setTotalAmount(bank.current);
      setCurrentBet(0);
    }
  }, [previousNumbers]);

  useEffect(() => {
    if (currentBet === 0) {
      resetPlayVariables();
    }
  }, [currentBet]);
  const setBet = ({ chip, setChip, chipValue }) => {
    if (!spin) {
      setBankValue((prevState) => prevState - wager);
      setCurrentBet((prevState) => prevState + wager);
      if (chip) {
        chipValue.current = chipValue.current + wager;
      } else {
        chipValue.current = wager;
        setChip(true);
      }
    }
  };

  const removeBet = ({ e, chipValue }) => {
    if (!spin) {
      e.preventDefault();
      if (chipValue.current > 0) {
        if (chipValue.current >= wager) {
          setBankValue((prevState) => prevState + wager);
          setCurrentBet((prevState) => prevState - wager);
          chipValue.current = chipValue.current - wager;
        } else {
          setBankValue((prevState) => prevState + chipValue.current);
          setCurrentBet((prevState) => prevState - chipValue.current);
          chipValue.current = 0;
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
    winningNumber,
    zeroPlay,
    eachPlay,
    otoPlay,
    ttbPlay,
    bo3Play,
    rowPlay,
    ttbbetPlay,
    quarter1Play,
    quarter2Play,
    halfH1Play,
    halfH2Play,
    halfV1Play,
    halfV2Play,
    halfV3Play,
    halfBoard1Play,
    halfBoard2Play,
    plays,
    setUpdateBank,
  };
  return (
    <CasinoContext.Provider value={casinoContextvalues}>
      {children}
    </CasinoContext.Provider>
  );
}
