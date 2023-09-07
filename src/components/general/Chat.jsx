import React, { useState, useEffect, useRef } from "react";
import { useUI, useUIUpdate } from "../../contexts/UIContext";
import { useForm } from "react-hook-form";
import Message from "../chatRelated/Message";

export default function Chat() {
  const { isExpanded, customerData } = useUI();
  const { toggleExpanded } = useUIUpdate();
  const handleToggleExpanded = () => {
    toggleExpanded();
  };
  const { register, reset, error, handleSubmit, watch } = useForm();
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(1);
  const chatContainerRef = useRef(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const message = watch("message");
  const handleMessages = (data) => {
    setMessages((prevState) => [
      ...prevState,
      { user: customerData.name, message: data.message },
    ]);
    reset();
  };
  const initialMessages = [
    {
      user: "Mia",
      message: "I had a fantastic experience playing roulette here.",
    },
    {
      user: "John",
      message: "The blackjack games are amazing!",
    },
    {
      user: "Sophia",
      message: "I just hit the jackpot in the slots!",
    },
    {
      user: "David",
      message: "The casino atmosphere is great.",
    },
    {
      user: "Emma",
      message: "I love the variety of games here.",
    },
    {
      user: "Oliver",
      message: "Has anyone tried the poker tables?",
    },
    {
      user: "Ava",
      message: "I'm on a winning streak today!",
    },
    {
      user: "Noah",
      message: "The customer service is top-notch.",
    },
    {
      user: "Sophie",
      message: "I recommend trying the roulette wheel.",
    },
    {
      user: "Liam",
      message: "This casino has the best rewards program.",
    },
    {
      user: "Alice",
      message: "I had an amazing time playing blackjack at this casino!",
    },
    {
      user: "James",
      message: "The slot machines in this casino are so much fun!",
    },
    {
      user: "Sophia",
      message: "I won a jackpot at this casino! Best day ever!",
    },
    {
      user: "Oliver",
      message: "The poker tables here are top-notch. Highly recommended!",
    },
    {
      user: "Amelia",
      message: "I love the ambiance of this casino. It's always a great time.",
    },
    {
      user: "Benjamin",
      message: "The staff at this casino is friendly and professional.",
    },
    {
      user: "Mia",
      message: "I had a fantastic experience playing roulette here.",
    },
    {
      user: "Henry",
      message: "The live dealer games at this casino are very entertaining.",
    },
    {
      user: "Ava",
      message:
        "I always have a great time playing at this casino. Can't wait to come back!",
    },
    {
      user: "William",
      message:
        "The VIP program at this casino offers excellent perks and rewards.",
    },
    {
      user: "Charlotte",
      message:
        "I recommend trying out the specialty drinks at the casino bar. Delicious!",
    },
    {
      user: "Daniel",
      message:
        "The customer service at this casino is exceptional. They go above and beyond to assist you.",
    },
    {
      user: "Harper",
      message:
        "I had a great time attending the live shows and events at this casino.",
    },
    {
      user: "Matthew",
      message:
        "The variety of games available at this casino is impressive. There's something for everyone.",
    },
    {
      user: "Evelyn",
      message:
        "I enjoy the excitement and thrill of playing at this casino. It never gets old.",
    },
    {
      user: "Liam",
      message:
        "The rewards program at this casino is worth joining. It offers great benefits.",
    },
    {
      user: "Luna",
      message:
        "The casino tournaments here are intense and competitive. I love the challenge.",
    },
    {
      user: "Lucas",
      message:
        "I appreciate the high level of security and fairness at this casino. It's reassuring.",
    },
    {
      user: "Stella",
      message:
        "The restaurant options at this casino are fantastic. Great food and service.",
    },
    {
      user: "Jackson",
      message:
        "I had a lucky streak at the craps table in this casino. It was an unforgettable experience.",
    },
    {
      user: "Penelope",
      message:
        "The atmosphere of this casino is glamorous and luxurious. I felt like a VIP.",
    },
    {
      user: "Sebastian",
      message:
        "I appreciate the responsible gambling measures implemented at this casino.",
    },
    {
      user: "Chloe",
      message:
        "The loyalty program at this casino offers great incentives. I feel valued as a player.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (initialMessages.length > messages.length) {
        const randomIndex = Math.floor(Math.random() * initialMessages.length);
        const randomMessage = initialMessages[randomIndex];
        if (messages.length < 4) {
          setMessages((prevState) => [...prevState, randomMessage]);
        } else {
          setMessages((prevState) => prevState.slice(1));
          setMessages((prevState) => [...prevState, randomMessage]);
        }
        setIndex((prevState) => prevState++);
      } else {
        clearInterval(timer);
      }
    }, 2000 * (Math.random() * 9 + 5) * index);
  }, [messages, initialMessages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (
      chatContainerRef.current.scrollTop +
        chatContainerRef.current.clientHeight <
      chatContainerRef.current.scrollHeight
    ) {
      setUserScrolledUp(true);
    } else {
      setUserScrolledUp(false);
    }
  };

  useEffect(() => {
    chatContainerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      chatContainerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!userScrolledUp) {
      scrollToBottom();
    }
  }, [messages, userScrolledUp]);

  return (
    <div
      style={{
        position: "absolute",
        top: "73px",
        bottom: 0,
        right: 0,
        minWidth: isExpanded ? "342px" : "0",
        display: "flex",
        flexDirection: "column",
        zIndex: 2,
        color: "white",
        transition: "left 0.5s ease-in-out",
      }}
    >
      <div
        id="toggle-button"
        style={{
          position: "fixed",
          top: "50%",
          right: isExpanded ? "342px" : "0",
          zIndex: 4,
          color: "white",
        }}
        onClick={handleToggleExpanded}
      >
        <i
          id="expandIcon"
          className={
            isExpanded ? "fas fa-chevron-right" : "fas fa-chevron-left"
          }
        ></i>
      </div>
      <div
        className="varyWidth d-flex flex-column justify-content-between"
        style={{
          position: "fixed",
          top: "87px",
          right: 0,
          bottom: 0,
          minWidth: isExpanded ? "342px" : "0",
          width: "0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          zIndex: 2,
          color: "white",
        }}
      >
        <div
          className="w-100 d-flex p-4 "
          style={{
            height: "60px",
            backgroundColor: "#283968",
          }}
        >
          <p
            className="h2"
            style={{
              fontSize: "1em",
              alignSelf: "center",
              minWidth: "94.53px",
            }}
          >
            {" "}
            <i className="fas fa-dice"></i> Casino chat
          </p>
        </div>
        <div
          id="messages"
          className="w-100 flex-grow-1 d-flex flex-column align-content-center px-3"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            flexGrow: 1,
            backgroundColor: "#202a39",
          }}
          ref={chatContainerRef}
        >
          <div
            id="chat"
            className="varyWidth d-flex flex-column justify-content-between"
            style={{
              minWidth: isExpanded ? "342px" : "0",
              width: 0,
            }}
          >
            {messages.map((msg, index) => (
              <Message
                key={index}
                props={{
                  user: msg.user,
                  message: msg.message,
                }}
              />
            ))}
          </div>
        </div>
        <form
          action="#0"
          className="d-flex justify-content-between  align-content-center p-3 "
          style={{ backgroundColor: "#283968" }}
          onSubmit={handleSubmit(handleMessages)}
        >
          <input
            type="text"
            placeholder="Type chat messages here"
            className="px-2 "
            style={{
              height: "40px",
              alignSelf: "center",
              color: `${!customerData ? "white" : "black"}`,
              border: "none",
              borderRadius: "10px",
            }}
            {...register("message")}
            disabled={!customerData}
          />
          <input
            className="cmn--btn ml-auto "
            type="submit"
            style={{
              height: "40px",
              alignSelf: "center",
              border: "none",
              color: "white",
            }}
            value={"Send"}
            disabled={!customerData || !message}
          />
        </form>
      </div>
    </div>
  );
}
