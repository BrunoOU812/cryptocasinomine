import React, { useState, useEffect } from "react";
import Status from "./components/Status";
import Controls from "./components/Controls";
import Hand from "./components/Hand";
import jsonData from "./data/deck.json";

import axios from "axios";
import { API_BASE_URL } from "../../../apiConfig";

import { useUI } from "../../../contexts/UIContext";

const BlackjackGame = (props) => {
  const { customerData } = useUI();

  const GameState = {
    bet: "bet",
    init: "init",
    userTurn: "userTurn",
    dealerTurn: "dealerTurn",
  };

  const Deal = {
    user: "user",
    dealer: "dealer",
    hidden: "hidden",
  };

  const Message = {
    bet: "Place a Bet!",
    hitStand: "Hit or Stand?",
    bust: "Bust!",
    userWin: "You Win!",
    dealerWin: "Dealer Wins!",
    tie: "Tie!",
  };

  const data = JSON.parse(JSON.stringify(jsonData.cards));
  const [deck, setDeck] = useState(data);

  const [userCards, setUserCards] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState(GameState.bet);
  const [message, setMessage] = useState(Message.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true,
  });

  useEffect(() => {
    getUserBalance();

    if (gameState === GameState.init) {
      drawCard(Deal.user);
      drawCard(Deal.hidden);
      drawCard(Deal.user);
      drawCard(Deal.dealer);
      setGameState(GameState.userTurn);
      setMessage(Message.hitStand);
    }
  }, [gameState]);

  useEffect(() => {
    calculate(userCards, setUserScore);
    setUserCount(userCount + 1);
  }, [userCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  useEffect(() => {
    if (gameState === GameState.userTurn) {
      if (userScore === 21) {
        buttonState.hitDisabled = true;
        setButtonState({ ...buttonState });
      } else if (userScore > 21) {
        bust();
      }
    }
  }, [userCount]);

  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      if (dealerScore >= 17) {
        checkWin();
      } else {
        drawCard(Deal.dealer);
      }
    }
  }, [dealerCount]);

  const resetGame = () => {
    console.clear();
    setDeck(data);

    setUserCards([]);
    setUserScore(0);
    setUserCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);

    setBet(0);

    setGameState(GameState.bet);
    setMessage(Message.bet);
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true,
    });
  };

  const placeBet = (amount) => {
    setBet(amount);
    setBalance(Math.round((balance - amount) * 100) / 100);
    setGameState(GameState.init);
  };

  const drawCard = (dealType) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      deck.splice(randomIndex, 1);
      setDeck([...deck]);
      console.log("Remaining Cards:", deck.length);
      switch (card.suit) {
        case "spades":
          dealCard(dealType, card.value, "♠");
          break;
        case "diamonds":
          dealCard(dealType, card.value, "♦");
          break;
        case "clubs":
          dealCard(dealType, card.value, "♣");
          break;
        case "hearts":
          dealCard(dealType, card.value, "♥");
          break;
        default:
          break;
      }
    } else {
      alert("All cards have been drawn");
    }
  };

  const dealCard = (dealType, value, suit) => {
    switch (dealType) {
      case Deal.user:
        userCards.push({ value: value, suit: suit, hidden: false });
        setUserCards([...userCards]);
        break;
      case Deal.dealer:
        dealerCards.push({ value: value, suit: suit, hidden: false });
        setDealerCards([...dealerCards]);
        break;
      case Deal.hidden:
        dealerCards.push({ value: value, suit: suit, hidden: true });
        setDealerCards([...dealerCards]);
        break;
      default:
        break;
    }
  };

  const revealCard = () => {
    dealerCards.filter((card) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards]);
  };

  const calculate = (cards, setScore) => {
    let total = 0;
    cards.forEach((card) => {
      if (card.hidden === false && card.value !== "A") {
        switch (card.value) {
          case "K":
            total += 10;
            break;
          case "Q":
            total += 10;
            break;
          case "J":
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });

    const aces = cards.filter((card) => {
      return card.value === "A";
    });

    aces.forEach((card) => {
      if (card.hidden === false) {
        if (total + 11 > 21) {
          total += 1;
        } else if (total + 11 === 21) {
          if (aces.length > 1) {
            total += 1;
          } else {
            total += 11;
          }
        } else {
          total += 11;
        }
      }
    });
    setScore(total);
  };

  const hit = () => {
    drawCard(Deal.user);
  };

  const stand = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setGameState(GameState.dealerTurn);
    revealCard();
  };

  const bust = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setMessage(Message.bust);
  };

  const checkWin = () => {
    if (userScore > dealerScore || dealerScore > 21) {
      setBalance(Math.round((balance + bet * 2) * 100) / 100);
      setMessage(Message.userWin);
    } else if (dealerScore > userScore) {
      setMessage(Message.dealerWin);
    } else {
      setBalance(Math.round((balance + bet * 1) * 100) / 100);
      setMessage(Message.tie);
    }
  };

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

    axios
      .put(`${API_BASE_URL}/api/customers/${customerData.id}`, user)
      .then((res) => {
        console.log(res);
        //getUserBalance();
        setBalance(res.data.data.tokens);
      });
  };

  return (
    <div className="container">
      <div
        className="pokerGame"
        style={{
          width: 800,
          height: 700,
          padding: 10,
          //justifyContent: "center",
          //alignContent: "center",
          //display: "flex",
          margin: "auto",
          background: "rgb(0, 78, 0)",

          /*font-family: 'Lexend Exa', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;*/
        }}
      >
        <Status message={message} balance={balance} />
        <Controls
          balance={balance}
          gameState={gameState}
          buttonState={buttonState}
          betEvent={placeBet}
          hitEvent={hit}
          standEvent={stand}
          resetEvent={resetGame}
        />
        <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
        <Hand title={`Your Hand (${userScore})`} cards={userCards} />
      </div>
    </div>
  );
};

export default BlackjackGame;
