import { useRef, useState, useEffect } from "react";

import styles from "./slot-game.module.scss";
//import "./slot-game.module.scss";

import axios from "axios";
import { API_BASE_URL } from "../../../apiConfig";

import { useUI } from "../../../contexts/UIContext";

const SlotGame = (props) => {
  const { customerData } = useUI();

  //const debugEl = document.getElementById("debug");
  const iconMap = [
    "banana",
    "seven",
    "cherry",
    "plum",
    "orange",
    "bell",
    "bar",
    "lemon",
    "melon",
  ]; // Mapping of indexes to icons: start from banana in middle of initial position and then upwards
  const icon_width = 79; // Width of the icons
  const icon_height = 79; // Height of one icon in the strip
  const num_icons = 9; // Number of icons in the strip
  const time_per_icon = 150; // 100; // Max-speed in ms for animating one icon down
  //const indexes = [0, 0, 0]; // Holds icon indexes

  const minBet = 10;

  const inputRef = useRef(null);
  const reels = [useRef(null), useRef(null), useRef(null)];

  const [won, setWon] = useState(0);
  const [run, setRun] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(10);
  const [indexes, setIndexes] = useState([0, 0, 0]); // Holds icon indexes

  const [winClasses, setWinClasses] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);

  const sounds = {
    win: new Audio("/games/slot-game/sound/win.mp3"),
    spin: new Audio("/games/slot-game/sound/spin.mp3"),
    coins: new Audio("/games/slot-game/sound/coins.mp3"),
    alert: new Audio("/games/slot-game/sound/alert.mp3"),
  };

  //

  useEffect(() => {
    //console.log("load sounds");
    sounds.win.load();
    sounds.spin.load();
    sounds.coins.load();
    sounds.alert.load();
  }, []);

  useEffect(() => {
    //syncBalance(0);
    getUserBalance();

    if (run && isAutomatic) rollAll();
  }, [run, isAutomatic]);

  /**
   * Roll one reel
   */
  const roll = (reel, offset = 0) => {
    // Minimum of 2 + the reel offset rounds
    const delta =
      (offset + 2) * num_icons + Math.round(Math.random() * num_icons);

    // Return promise so we can wait for all reels to finish
    return new Promise((resolve, reject) => {
      const style = getComputedStyle(reel),
        // Current background position
        backgroundPositionY = parseFloat(style["background-position-y"]),
        // Target background position
        targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
        // Normalized background position, for reset
        normTargetBackgroundPositionY =
          targetBackgroundPositionY % (num_icons * icon_height);

      // Delay animation with timeout, for some reason a delay in the animation property causes stutter
      setTimeout(() => {
        // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
        reel.style.transition = `background-position-y ${
          (8 + 1 * delta) * time_per_icon
        }ms cubic-bezier(.41,-0.01,.63,1.09)`;
        // Set background position
        reel.style.backgroundPositionY = `${
          backgroundPositionY + delta * icon_height
        }px`;
      }, offset * 150);

      // After animation
      setTimeout(() => {
        // Reset position, so that it doesn't get higher without limit
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        // Resolve this promise
        resolve(delta % num_icons);
      }, (8 + 1 * delta) * time_per_icon + offset * 150);
    });
  };

  /**
   * Roll all reels, when promise resolves roll again
   */
  const rollAll = () => {
    setWon(0);
    setRun(false);

    if (balance < currentBet) {
      setIsAutomatic(false);
      handleError();
      return;
    }

    setIsRolling(true);
    sounds.spin.play();
    //debugEl.textContent = "rolling...";

    // Activate each reel
    Promise.all(reels.map((reel, i) => roll(reel.current, i)))

      // When all reels done animating (all promises solve)
      .then((deltas) => {
        //console.log(isAutomatic, currentBet);

        // add up indexes
        const _indexes = indexes;
        deltas.forEach(
          (delta, i) => (_indexes[i] = (_indexes[i] + delta) % num_icons)
        );

        setIndexes(_indexes);

        //debugEl.textContent = indexes.map((i) => iconMap[i]).join(" - ");
        console.log(indexes.map((i) => iconMap[i]).join(" - "));

        // Win conditions
        let delay = 3000;
        if (indexes[0] === indexes[1] || indexes[1] === indexes[2]) {
          delay = 5000;
          sounds.win.play();
          const winCls = indexes[0] === indexes[2] ? "win2" : "win1";
          setWinClasses(winCls);
          handleResult(winCls);
        } else {
          handleResult("lose");
        }

        setTimeout(() => {
          sounds.coins.play();
          setWon(0);
          setWinClasses("");
        }, 2500);

        if (isAutomatic) {
          setTimeout(() => {
            setRun(true);
          }, delay);
        }

        setIsRolling(false);
      });
  };

  const handleAutomatic = () => {
    setIsAutomatic((current) => !current);
    if (!isAutomatic) {
      setRun(true);
    }
  };

  const handleBet = (value) => {
    if (value < minBet || balance - value < 0) {
      value = value < minBet ? minBet : balance;
      inputRef.current.focus();
      inputRef.current.value = value;
      handleError();
    }

    setCurrentBet(parseInt(value));
  };

  const handleError = () => {
    setWinClasses("error");
    sounds.alert.play();
    setTimeout(() => setWinClasses(""), 500);
  };

  const handleResult = (type) => {
    switch (type) {
      case "win1":
        syncBalance(currentBet * 2);
        break;
      case "win2":
        syncBalance(currentBet * 5);
        break;
      default:
        syncBalance(currentBet * -1);
        break;
    }
  };

  // Kickoff
  //setTimeout(rollAll, 1000);

  ////// Backend

  const getUserBalance = async () => {
    const res = await axios.get(
      `${API_BASE_URL}/api/customers/${customerData.id}`
    );
    setBalance(res.data.data.tokens);
    return res.data.data;
  };

  const syncBalance = async (value = 0) => {
    const user = await getUserBalance();

    user.tokens += parseFloat(value);

    const log = {
      customer_id: customerData.id,
      user_id: 2, //
      datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
      awarded_tokens: value > 0 ? value : 0,
      taken_tokens: value < 0 ? value : 0,
      reason: "Slot game " + (value > 0 ? "win" : "lose"), // TODO: More details ?
    };

    axios.post(`${API_BASE_URL}/api/customer_balance_logs`, log).then((res) => {
      console.log(res);
    });

    axios
      .put(`${API_BASE_URL}/api/customers/${customerData.id}`, user)
      .then((res) => {
        console.log(res);
        //getUserBalance();
        setBalance(res.data.data.tokens);
        setWon(value);
      });

    if (user.tokens - currentBet < 0) {
      setIsAutomatic(false);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.currentBalance}>
          Current Balance:{" "}
          <span className={styles.slotBalance}>
            {balance - won}
            {won > 0 ? ` ( + ${won} )` : won < 0 ? ` ( - ${won * -1})` : ""}
          </span>
        </div>
        <div className={styles.currentBet}>
          Current Bet: <span className={styles.slotBet}>{currentBet}</span>
        </div>

        <div className={styles.slotContainer}>
          <div className={styles.slotSlots + " " + styles[winClasses]}>
            <div className={styles.slotReel} ref={reels[0]}></div>
            <div className={styles.slotReel} ref={reels[1]}></div>
            <div className={styles.slotReel} ref={reels[2]}></div>
          </div>
          {/* <div id="debug" className={styles.debug}></div> */}

          {/* <img style="position:fixed; left: 0; top: 0; height: 100vh; width: auto;"  src="https://assets.codepen.io/439000/slotreel.webp"> */}
          {/* <a target="_blank" href="https://codepen.io/josfabre/pens/public" style="position: fixed; left: 8em; top: 1em; font-family: Sans-Serif; color: #333; font-size: 13px; text-decoration: none; text-transform: uppercase; padding: 0.5em 1em; border: 1px solid #333; border-radius: 6px; opacity: 0.9; ">All my pens</a> */}
        </div>
        <div className="">
          <input
            ref={inputRef}
            type="number"
            defaultValue={currentBet}
            className={styles.betInput}
            disabled={isRolling || isAutomatic}
            min={10}
            max={balance}
          />
          <button
            className={styles.setBet}
            disabled={isRolling || isAutomatic}
            onClick={() => handleBet(inputRef.current.value)}
          >
            Set Bet
          </button>
        </div>
        <div className={styles.slotButtons}>
          <button
            onClick={rollAll}
            disabled={balance < 10 || isRolling || isAutomatic}
          >
            {isRolling ? "Rolling..." : "Roll"}
          </button>
          <button onClick={handleAutomatic} disabled={balance < 10}>
            {isAutomatic ? "Stop" : "Automatic"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SlotGame;
