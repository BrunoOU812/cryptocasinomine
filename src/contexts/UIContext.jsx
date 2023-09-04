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
  const [btcValue, setBtcValue] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [usdtValue, setUsdtValue] = useState(0);
  const [msg, setMsg] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
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
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/deposits?customer_id=${customerData.id}`
          );
          const values = response.data.data.map((item) => item.value);
          const newTotalAmount =
            totalAmount -
            +withdrawResponses[withdrawResponses.length - 1].value;
          const modifiedCustomerData = {
            id: customerData.id,
            name: customerData.name,
            email: customerData.email,
            status: customerData.status,
            muted: customerData.muted,
            tokens: newTotalAmount,
          };
          console.log(withdrawResponses);
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
  }, [withdrawResponses]);

  useEffect(() => {
    {
      logged && setTotalAmount(customerData.tokens);
    }
  }, [logged]);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cryptos/${id}`);
        return response.data.data.current_price;
      } catch (error) {
        return null;
      }
    };
    const fetchDataForCrypto = async (id, setValue) => {
      const data = await fetchData(id);
      if (data !== null) {
        // const value = customerData === null ? 0 : customerData.tokens / data;
        // setValue(id === 8 ? value : value.toFixed(8));
        setValue(data);
      }
    };

    fetchDataForCrypto(6, setBtcValue);
    fetchDataForCrypto(7, setEthValue);
    fetchDataForCrypto(8, setUsdtValue);
  }, [logged]);

  const setDepositResponse = (response) => {
    setDepositResponses([...depositResponses, response]);
  };

  const setWithdrawResponse = (response) => {
    setWithdrawResponses([...withdrawResponses, response]);
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
    setWithdrawResponse: setWithdrawResponse,
    totalAmount: totalAmount,
    logged: logged,
    setLogged: setLogged,
    showLogin: showLogin,
    setShowLogin: setShowLogin,
    showRegistered: showRegistered,
    setShowRegistered: setShowRegistered,
    customerData: customerData,
    setCustomerData: setCustomerData,
    btcValue: btcValue,
    setBtcValue: setBtcValue,
    ethValue: ethValue,
    setEthValue: setEthValue,
    usdtValue: usdtValue,
    setUsdtValue: setUsdtValue,
    api: API_BASE_URL,
    msg: msg,
    setMsg: setMsg,
    selectedCoin: selectedCoin,
    setSelectedCoin: setSelectedCoin,
    setTotalAmount,
  };

  return (
    <UICreateContext.Provider value={uiContextValues}>
      <UIUpdateContext.Provider value={uiContextValues}>
        {children}
      </UIUpdateContext.Provider>
    </UICreateContext.Provider>
  );
}
