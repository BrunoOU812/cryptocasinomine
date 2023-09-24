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
  const [transactionID, setTransactionID] = useState({
    type: "deposit",
    id: "27",
  });
  const [check, setCheck] = useState(false);

  const fetchData = async () => {
    if (transactionID.type !== undefined && logged && customerData) {
      try {
        const deposits = await axios.get(
          `${API_BASE_URL}/api/${transactionID.type}s`
        );
        for (const item of deposits.data.data) {
          if (item.id === +transactionID.id) {
            const response = await axios.get(
              `${API_BASE_URL}/api/${transactionID.type}s/${transactionID.id}`
            );
            if (
              response.status === 200 &&
              response.data.data.status === "Success"
            ) {
              const deleted = await axios.delete(
                `${API_BASE_URL}/api/${transactionID.type}s/${transactionID.id}`
              );
              if (deleted.request.status === 200) {
                const customer = await axios.get(
                  `${API_BASE_URL}/api/customers/${response.data.data.customer_id}`
                );
                customer.data.data.tokens =
                  transactionID.type === "deposit"
                    ? customer.data.data.tokens + response.data.data.value
                    : customer.data.data.tokens - response.data.data.value;
                await axios.put(
                  `${API_BASE_URL}/api/customers/${response.data.data.customer_id}`,
                  customer.data.data
                );
                setTotalAmount(customer.data.data.tokens);
                setMsg((prevState) => [
                  ...prevState,
                  {
                    to: "Admin",
                    comment: `The ${transactionID.type} is successful!`,
                  },
                ]);
              }
            }
          }
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setCheck((prevState) => !prevState);
    }, 5000);
  }, [check]);

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
        setCheck((prevState) => !prevState);
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
    setTransactionID,
  };

  return (
    <UICreateContext.Provider value={uiContextValues}>
      <UIUpdateContext.Provider value={uiContextValues}>
        {children}
      </UIUpdateContext.Provider>
    </UICreateContext.Provider>
  );
}
