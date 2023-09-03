useEffect(() => {
  const lastWinningNumber = winningNumber;
  if (previousNumbers.length > 0) {
    numRed.includes(lastWinningNumber)
      ? setPlays((prevState) => [...prevState, "RED"])
      : setPlays((prevState) => [...prevState, "BLACK"]);
    lastWinningNumber % 2 === 0
      ? setPlays((prevState) => [...prevState, "EVEN"])
      : setPlays((prevState) => [...prevState, "ODD"]);
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
          setPlays((prevState) => [...prevState, `${play.prefix}_${i}`]);
      }
    }
    for (let i = 0; i <= each.length - 1; i++) {
      i === lastWinningNumber &&
        setPlays((prevState) => [...prevState, `EACH_${i}`]);
    }
    for (let i = 0; i <= halfBoard1.length - 1; i++) {
      halfBoard1.includes(lastWinningNumber) &&
        setPlays((prevState) => [...prevState, `HALFBOARD1_${i}`]);
    }
    for (let i = 0; i <= halfBoard2.length - 1; i++) {
      halfBoard2.includes(lastWinningNumber) &&
        setPlays((prevState) => [...prevState, `HALFBOARD2_${i}`]);
    }
    0 === lastWinningNumber &&
      setPlays((prevState) => [...prevState, `ZERO_0`]);
  }
  // }, [winningNumber]);
  // useEffect(() => {
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
    Object.keys(vrbl).forEach((key) =>
      fnct((prevState) => ({ ...prevState, [key]: 0 }))
    );
  });
  setCurrentBet(0);
  // setPlays([]);
}, [previousNumbers]);
