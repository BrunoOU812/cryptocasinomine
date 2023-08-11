import React from "react";
import axios from "axios";
import { useUI } from "../../contexts/UIContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function CompleteYourWithdraw() {
  const { setWithdrawResponses, customerData } = useUI();
  const { register, reset, handleSubmit } = useForm();

  const handleWithdrawNowClick = async (data) => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const withdraw = {
        customer_id: customerData.id,
        datetime: formattedDateTime,
        crypto_id: 1,
        value: 0,
        tokens: +data.amount,
        status: "Pending",
        confirmed_id: 1,
        withdraw_address: "your_withdraw_address",
        customer_name: customerData.name,
      };
      setWithdrawResponses((prevState) => [...prevState, withdraw]);
      console.log(customerData.tokens - +data.amount);
      if (customerData.tokens - +data.amount >= 0) {
        try {
          await axios.post("http://localhost:8000/api/withdraws", withdraw);
          reset();
        } catch (error) {
          toast.error("Error making withdraw: " + error.message);
        }
      } else {
        toast.error("Withdraw amount greater than allowed");
      }
    } catch (error) {
      toast.error("Error processing withdraw: " + error.message);
    }
  };

  return (
    <div className="col">
      <div className="deposit__complate">
        <h3>Complete Your Withdraw</h3>

        <form onSubmit={handleSubmit(handleWithdrawNowClick)}>
          <div className="deposit__wallet">
            <div className="deopsit__wallet__items" style={{ border: "none" }}>
              <p>* Amount</p>
            </div>
            <div className="single-input mb__20">
              <input
                type="text"
                id="dAmount"
                name="amount"
                placeholder="Enter Amount"
                autoComplete="off"
                {...register("amount")}
              />
            </div>
          </div>
          <div className="btn-area">
            <input type="submit" className="cmn--btn" value="Withdraw" />
          </div>
        </form>
      </div>
    </div>
  );
}
