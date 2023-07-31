import React, { useState, useEffect } from "react";
import { useUI, useUIUpdate } from "../../contexts/UIContext";
import Message from "../chatRelated/Message";

export default function Chat() {
  const { isExpanded } = useUI();
  const { toggleExpanded } = useUIUpdate();
  const handleToggleExpanded = () => {
    toggleExpanded();
  };
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const fetchChatData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/messages");
  //       const data = await response.json();
  //       setMessages(data);
  //       console.log(messages);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchChatData();
  // }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: "87px",
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
          className="w-100 flex-grow-1 d-flex flex-column align-content-center px-3 "
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            flexGrow: 1,
            backgroundColor: "#202a39",
          }}
        >
          <div
            id="chat"
            className=" varyWidth d-flex flex-column justify-content-between "
            style={{
              minWidth: isExpanded ? "342px" : "0",

              width: 0,
            }}
          >
            <Message></Message>
          </div>
        </div>
        <form
          action="#0"
          className="d-flex justify-content-between  align-content-center p-3 "
          style={{ backgroundColor: "#283968" }}
        >
          <input
            type="text"
            placeholder="Type chat messages here"
            className="px-2 "
            style={{
              height: "40px",
              alignSelf: "center",
              border: "none",
              borderRadius: "10px",
            }}
          />
          <button
            className="cmn--btn ml-auto "
            type="submit"
            style={{
              height: "40px",
              alignSelf: "center",
              border: "none",
              color: "white",
            }}
          >
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
