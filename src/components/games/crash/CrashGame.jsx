import { useRef, useState, useEffect } from "react";

import { CrashEngine, CrashEngineState } from "./CrashEngine";

import styles from "./crash-game.module.scss";

import axios from "axios";
import { API_BASE_URL } from "../../../apiConfig";

import { useUI } from "../../../contexts/UIContext";

const CrashGame = () => {
  const { customerData } = useUI();

  const canvasRef = useRef(null);
  const [engine, setEngine] = useState(null);
  const [timer, setTimer] = useState(0);

  const yTickWidth = 2;
  const xTickWidth = 2;

  const minBet = 10;

  const inputRef = useRef(null);

  const [won, setWon] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currentBet, setCurrentBet] = useState(0);

  //const [winClasses, setWinClasses] = useState("");
  const [cashedOut, setCashedOut] = useState(false);

  useEffect(() => {
    // Mounted?
    console.log("CrashGame mounted");

    setWon(0);
    getUserBalance();

    //setEngine(new CrashEngine());
    //if (timer) cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    if (!engine) return;
    engine.startTime = new Date().getTime();
    engine.onResize(canvasRef.current.width, canvasRef.current.height);

    if (engine.state !== CrashEngineState.OVER) {
      engine.state = CrashEngineState.RUNNING;

      setTimer(requestAnimationFrame(() => tick()));
    }
  }, [engine]);

  useEffect(() => {
    if (engine?.state === CrashEngineState.OVER) {
      setTimeout(() => {
        reset();
      }, 3000);
    }
  }, [engine?.state]);

  const stepValues = (multiplier, e = 5, n = 2) => {
    for (let i = 0.4, r = 0.1; ; ) {
      if (multiplier < i) return r;

      r *= n;
      i *= e;

      if (multiplier < i) return r;

      r *= e;
      i *= n;
    }
  };

  const tick = () => {
    if (!canvasRef.current || engine.state !== CrashEngineState.RUNNING) return;
    //console.log(canvasRef.current);

    engine.tick();
    var ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, engine.graphWidth, engine.graphHeight);

    // draw line
    ctx.beginPath();
    ctx.strokeStyle = "#853278";
    ctx.lineWidth = 2;
    ctx.moveTo(0, engine.plotHeight);
    var a = engine.getElapsedPosition(engine.elapsedTime);
    var b = engine.getElapsedPosition(engine.elapsedTime / 2);
    ctx.quadraticCurveTo(b.x, b.y, a.x, a.y);
    ctx.stroke();

    // draw caption
    ctx.font = "bold 50px sans-serif";
    ctx.fillStyle = "red";
    var labelText = engine.multiplier.toFixed(2) + "x";
    var textSize = ctx.measureText(labelText);
    ctx.fillText(
      labelText,
      engine.plotWidth / 2 - textSize.width / 2,
      engine.plotHeight / 2 -
        (textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent) /
          2
    );

    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#222";
    ctx.strokeStyle = "#777";

    // draw y axis
    var stepOffset = stepValues(engine.multiplier || 1);
    var stepScale = engine.plotHeight / engine.yAxis;
    var subStepOffset = stepOffset * stepScale;
    var subSteps = Math.max(
      2,
      Math.min(16, ~~(subStepOffset / Math.max(3, engine.yAxis / stepOffset)))
    );
    subSteps += subSteps % 2;

    for (
      var offset = stepOffset, step = 0;
      offset < engine.yAxis + stepOffset && step <= 100;
      offset += stepOffset, step++
    ) {
      var positionX = 0.5 + ~~engine.plotWidth + 15;
      var positionY = engine.plotHeight - offset * stepScale;

      // draw ticker
      ctx.strokeStyle = "#444";
      ctx.lineWidth = yTickWidth;
      ctx.beginPath();
      ctx.moveTo(positionX - yTickWidth, positionY);
      ctx.lineTo(positionX, positionY);
      ctx.stroke();
      ctx.strokeStyle = "#777";

      // draw caption
      var labelText =
        engine
          .getYMultiplier(positionY)
          .toFixed(engine.multiplier > 2 ? 0 : 1) + "x";

      var textSize = ctx.measureText(labelText);
      ctx.fillText(
        labelText,
        positionX + 10,
        positionY +
          (textSize.actualBoundingBoxAscent +
            textSize.actualBoundingBoxDescent) /
            2
      );

      // draw substeps
      for (var o = 1; o < subSteps; o++) {
        var isMiddleSubStep = o === subSteps / 2;
        var subStepWidth = isMiddleSubStep ? 12 : 7;
        var subStepPositionY =
          0.5 + ~~(positionY + (subStepOffset / subSteps) * o);

        // draw ticker
        ctx.beginPath();
        ctx.moveTo(positionX - subStepWidth, subStepPositionY);
        ctx.lineTo(positionX, subStepPositionY);
        ctx.stroke();
      }
    }

    // draw x axis
    var stepOffset = stepValues(engine.xAxis, 5, 2);
    var stepScale = engine.plotWidth / (engine.xAxis / stepOffset);

    //console.log(stepOffset, stepScale, engine.state);

    for (
      var step = 1, offset = 0;
      offset < engine.xAxis + stepOffset && step <= 100;
      offset += stepOffset, step++
    ) {
      var seconds = offset / 1000;
      var positionX = 0 === step ? 4 : step * stepScale;
      var positionY = engine.plotHeight + 10;

      // draw ticker
      ctx.strokeStyle = "#444";
      ctx.lineWidth = xTickWidth;
      ctx.beginPath();
      ctx.moveTo(positionX, positionY - xTickWidth / 2);
      ctx.lineTo(positionX, positionY + xTickWidth);
      ctx.stroke();
      ctx.strokeStyle = "#777";

      // draw caption
      var labelText = seconds.toFixed(0) + "s";
      var textSize = ctx.measureText(labelText);
      ctx.fillText(labelText, positionX - textSize.width / 2, positionY + 15);
    }

    setTimer(requestAnimationFrame(() => tick()));
  };

  ///

  const handleStart = () => {
    if (engine && engine?.state === CrashEngineState.RUNNING) return;

    setWon(0);
    getUserBalance();

    setEngine(new CrashEngine());
    if (timer) cancelAnimationFrame(timer);
  };

  const handleBet = (value) => {
    if (value < minBet || balance - value < 0) {
      value = value < minBet ? minBet : balance;
      inputRef.current.focus();
      inputRef.current.value = value;
      handleError();
    } else {
      handleStart();
      setCurrentBet(parseInt(value));
      syncBalance(Math.ceil(value * -1));
    }
  };

  const handleError = () => {
    //engine.state = CrashEngineState.OVER;
    //setWinClasses("error");
    //sounds.alert.play();
    //setTimeout(() => setWinClasses(""), 500);
  };

  const handleCashOut = () => {
    engine.state = CrashEngineState.OVER;
    setCashedOut(true);
    syncBalance(Math.ceil(currentBet * engine.multiplier));
  };

  const reset = () => {
    setEngine(null);
    setTimer(0);
    setCurrentBet(0);
    setCashedOut(false);
    engine.destroy();
  };

  const getUserBalance = async () => {
    const res = await axios.get(
      `${API_BASE_URL}/api/customers/${customerData.id}`
    );
    setBalance(res.data.data.tokens);
    return res.data.data;
  };

  const syncBalance = async (value = 0) => {
    setTimeout(() => {
      //sounds.coins.play();
      setWon(0);
      //setWinClasses("");
    }, 2500);

    const user = await getUserBalance();

    user.tokens += parseFloat(value);

    axios
      .put(`${API_BASE_URL}/api/customers/${customerData.id}`, user)
      .then((res) => {
        console.log(res);
        //getUserBalance();
        setBalance(res.data.data.tokens);
        setWon(value);
      });

    /*if (user.tokens - currentBet < 0) {
      setIsAutomatic(false);
    }*/
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.currentBalance}>
          Current Balance:{" "}
          <span className={styles.crashBalance}>
            {balance - won}
            {won > 0 ? ` ( + ${won} )` : won < 0 ? ` ( - ${won * -1})` : ""}
          </span>
        </div>
        <div className={styles.currentBet}>
          Current Bet: <span className={styles.crashBet}>{currentBet}</span>
        </div>

        <div className={styles.crashContainer}>
          {/* <div className="container center"> */}
          <canvas
            style={{ background: "#e2e2e2" }}
            ref={canvasRef}
            width="600"
            height="400"
          ></canvas>

          {/* </div> */}
        </div>
        <div className="">
          <input
            ref={inputRef}
            type="number"
            defaultValue={minBet}
            className={styles.betInput}
            disabled={cashedOut || engine?.state === CrashEngineState.OVER}
            min={10}
            max={balance}
          />
          <button
            className={styles.setBet}
            disabled={cashedOut || engine?.state === CrashEngineState.OVER}
            //disabled={isRolling || isAutomatic}
            onClick={() => handleBet(inputRef.current.value)}
          >
            Set Bet
          </button>
        </div>
        <div className={styles.crashButtons}>
          <button
            onClick={handleStart}
            disabled={
              cashedOut ||
              !currentBet ||
              (engine?.state && engine?.state !== CrashEngineState.LOADING)
            }
          >
            Start
          </button>
          <button
            onClick={handleCashOut}
            disabled={
              cashedOut ||
              balance < 10 ||
              !currentBet ||
              engine?.state !== CrashEngineState.RUNNING
            }
          >
            Cash Out
          </button>
        </div>
      </div>
    </>
  );
};

export default CrashGame;
