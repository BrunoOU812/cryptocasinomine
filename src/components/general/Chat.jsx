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
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (initialMessages.length > messages.length) {
        const randomIndex = Math.floor(Math.random() * initialMessages.length);
        const randomMessage = initialMessages[randomIndex];

        if (messages.length < 20) {
          setMessages((prevState) => [...prevState, randomMessage]);
        } else {
          setMessages([]);
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
              color: "black",
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
          />
        </form>
      </div>
    </div>
  );
}
