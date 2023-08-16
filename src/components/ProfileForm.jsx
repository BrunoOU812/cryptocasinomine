import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
import { FaEdit } from "react-icons/fa";
export default function Profile(props) {
  const { transaction } = useParams();
  const { setDepositResponse, setWithdrawResponse, api, setMsg, customerData } =
    useUI();
  const { register, reset, error, handleSubmit, watch } = useForm();
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(customerData.email);
  const [name, setName] = useState(customerData.name);
  const [password, setPassword] = useState(customerData.status);
  const [confirmPassword, setConfirmPassword] = useState(customerData.status);
  console.log(customerData);
  const handleDepositNowClick = async (e) => {
    e.preventDefault();
    try {
      const operation = {
        id: customerData.id,
        name: name,
        email: email,
        status: password,
        muted: false,
        tokens: customerData.tokens,
      };
      console.log(operation);
      await axios.put(`${api}/api/customers/${customerData.id}`, operation);
    } catch (error) {
      toast.error("Error fetching customer data:", error);
    }
  };

  const Field = ({ props }) => {
    const [value, setValue] = useState(props.value);
    return (
      <>
        <div className="deopsit__wallet__items" style={{ border: "none" }}>
          <p
            style={{ color: "white", fontSize: "1em", paddingBottom: "0.5em" }}
          >
            {props.field}
          </p>
        </div>
        <div className="single-input mb__20" style={{ position: "relative" }}>
          <input
            type={props.type}
            id={props.name}
            name={props.name}
            placeholder={props.field}
            value={value}
            autoComplete="off"
            // {...register(`${props.name}`)}
            disabled={!edit}
            onChange={(e) => setValue(e.target.value)}
            style={{
              color: `${edit ? "#222" : "#888"}`,
              backgroundColor: `${edit ? "#eee" : "#282840"}`,
            }}
          />
          <div
            className="amount-preview"
            style={{
              paddingTop: "10px",
              color: "#888",
            }}
          ></div>
        </div>
      </>
    );
  };
  return (
    <div
      className="col"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2vw",
      }}
    >
      <div
        className="deposit__complate"
        style={{
          textAlign: "left",
          width: "100%",
          margin: "0 0 0 -10px",
        }}
      >
        <div>
          <h3 style={{ display: "flex", justifyContent: "space-between" }}>
            Profile{" "}
            <button
              style={{
                fontSize: "0.8em",
                cursor: "pointer",
                border: "none",
                background: "none",
                color: `${edit ? "#557" : "#88a"}`,
              }}
              onClick={() => {
                setEdit((prevState) => !prevState);
              }}
            >
              <FaEdit></FaEdit> Edit
            </button>
          </h3>
          <div className="deopsit__wallet__items" style={{ border: "none" }}>
            <p
              style={{
                color: "white",
                fontSize: "1em",
                paddingBottom: "0.5em",
              }}
            >
              "Email"
            </p>
          </div>
          <div className="single-input mb__20" style={{ position: "relative" }}>
            <input
              type={props.type}
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              autoComplete="off"
              // {...register(`${props.name}`)}
              disabled={!edit}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                color: `${edit ? "#222" : "#888"}`,
                backgroundColor: `${edit ? "#eee" : "#282840"}`,
              }}
            />
            <div
              className="amount-preview"
              style={{
                paddingTop: "10px",
                color: "#888",
              }}
            ></div>
          </div>
          <div className="deopsit__wallet__items" style={{ border: "none" }}>
            <p
              style={{
                color: "white",
                fontSize: "1em",
                paddingBottom: "0.5em",
              }}
            >
              "User Name"
            </p>
          </div>
          <div className="single-input mb__20" style={{ position: "relative" }}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="User Name"
              value={name}
              autoComplete="off"
              // {...register(`${props.name}`)}
              disabled={!edit}
              onChange={(e) => setName(e.target.value)}
              style={{
                color: `${edit ? "#222" : "#888"}`,
                backgroundColor: `${edit ? "#eee" : "#282840"}`,
              }}
            />
            <div
              className="amount-preview"
              style={{
                paddingTop: "10px",
                color: "#888",
              }}
            ></div>
          </div>
          <div className="deopsit__wallet__items" style={{ border: "none" }}>
            <p
              style={{
                color: "white",
                fontSize: "1em",
                paddingBottom: "0.5em",
              }}
            >
              "Password"
            </p>
          </div>
          <div className="single-input mb__20" style={{ position: "relative" }}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              autoComplete="off"
              // {...register(`${props.name}`)}
              disabled={!edit}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                color: `${edit ? "#222" : "#888"}`,
                backgroundColor: `${edit ? "#eee" : "#282840"}`,
              }}
            />
            <div
              className="amount-preview"
              style={{
                paddingTop: "10px",
                color: "#888",
              }}
            ></div>
          </div>
          <div className="deopsit__wallet__items" style={{ border: "none" }}>
            <p
              style={{
                color: "white",
                fontSize: "1em",
                paddingBottom: "0.5em",
              }}
            >
              "Confirm Password"
            </p>
          </div>
          <div className="single-input mb__20" style={{ position: "relative" }}>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              autoComplete="off"
              // {...register(`${props.name}`)}
              disabled={!edit}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                color: `${edit ? "#222" : "#888"}`,
                backgroundColor: `${edit ? "#eee" : "#282840"}`,
              }}
            />
            <div
              className="amount-preview"
              style={{
                paddingTop: "10px",
                color: "#888",
              }}
            ></div>
          </div>
        </div>

        <form
          action="#"
          onSubmit={(e) => {
            handleDepositNowClick(e);
          }}
        >
          <div className="deposit__wallet"></div>

          <div className="btn-area">
            <input
              type="submit"
              className="cmn--btn"
              value="Accept"
              style={{
                backgroundColor: `${edit ? "#f47" : "#225"}`,
                color: `${edit ? "#fff" : "#99b"}`,
              }}
              disabled={!edit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
