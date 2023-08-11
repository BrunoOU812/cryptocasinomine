import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../apiConfig";
export const UICreateContext = createContext();
export const UIUpdateContext = createContext();
export const useUI = () => {
  return useContext(UICreateContext);
};
export const useUIUpdate = () => {
  return useContext(UIUpdateContext);
};
export default function UIContextProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [customerData, setCustomerData] = useState(null); // Almacena los datos del cliente
  const [depositResponses, setDepositResponses] = useState([]);
  const [withdrawResponses, setWithdrawResponses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [logged, setLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistered, setShowRegistered] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (logged && customerData) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/deposits?customer_id=${customerData.id}`
          );
          const values = response.data.data.map((item) => item.value);
          const newTotalAmount =
            totalAmount + +depositResponses[depositResponses.length - 1].value;
          const modifiedCustomerData = {
            id: customerData.id,
            name: customerData.name,
            email: customerData.email,
            status: customerData.status,
            muted: customerData.muted,
            tokens: newTotalAmount,
          };
          console.log(depositResponses);
          await axios.put(
            `${API_BASE_URL}/api/customers/${customerData.id}`,
            modifiedCustomerData
          );
          setTotalAmount(newTotalAmount);
        } catch (error) {
          console.error("Error obtaining user data:", error);
          // toast.error("Error obtaining user data: " + error.message);
        }
      }
    }

    fetchData();
  }, [depositResponses]);

  useEffect(() => {
    async function fetchData() {
      if (logged && customerData) {
        console.log({
          id: customerData.id,
          name: customerData.name,
          email: customerData.email,
          status: customerData.status,
          muted: customerData.muted,
          tokens: "newTotalAmount",
        });

        try {
          const newTotalAmount =
            totalAmount -
            +withdrawResponses[withdrawResponses.length - 1].tokens;
          const modifiedCustomerData = {
            id: customerData.id,
            name: customerData.name,
            email: customerData.email,
            status: customerData.status,
            muted: customerData.muted,
            tokens: newTotalAmount,
          };
          console.log(newTotalAmount);
          if (newTotalAmount >= 0) {
            await axios.put(
              `${API_BASE_URL}/api/customers/${customerData.id}`,
              modifiedCustomerData
            );
            setTotalAmount(newTotalAmount);
          }
        } catch (error) {
          toast.error("Error obtaining user data:", error);
        }
      } else {
        toast.error("Not working");
      }
    }

    fetchData();
  }, [withdrawResponses]);

  useEffect(() => {
    {
      logged && setTotalAmount(customerData.tokens);
    }
  }, [logged]);

  const setDepositResponse = (response) => {
    setDepositResponses([...depositResponses, response]);
  };

  const toggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const uiContextValues = {
    isExpanded: isExpanded,
    toggleExpanded: toggleExpanded,
    customerData: customerData,
    depositResponses: depositResponses,
    setDepositResponse: setDepositResponse,
    withdrawResponses: withdrawResponses,
    setWithdrawResponses: setWithdrawResponses,
    totalAmount: totalAmount,
    logged: logged,
    setLogged: setLogged,
    showLogin: showLogin,
    setShowLogin: setShowLogin,
    showRegistered: showRegistered,
    setShowRegistered: setShowRegistered,
    customerData: customerData,
    setCustomerData: setCustomerData,
    api: API_BASE_URL,
  };

  return (
    <UICreateContext.Provider value={uiContextValues}>
      <UIUpdateContext.Provider value={uiContextValues}>
        {children}
      </UIUpdateContext.Provider>
    </UICreateContext.Provider>
  );
}
