import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Obtener los datos del cliente con ID 2
    axios
      .get("http://localhost:8000/api/customers/2")
      .then((response) => {
        setCustomerData(response.data); // Almacenar los datos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener datos del cliente:", error);
      });
  }, []);

  useEffect(() => {
    // Obtener los datos del cliente con ID 2
    axios
      .get("http://localhost:8000/api/deposits")
      .then((response) => {
        let values = Array(response.data.data.length)
          .fill()
          .map((item, i) => response.data.data[i].value)
          .reduce((a, b) => a + b);
        setTotalAmount(values);
      })
      .catch((error) => {
        console.error("Error al obtener datos del cliente:", error);
      });
  }, [depositResponses]);

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
    totalAmount: totalAmount,
  };

  return (
    <UICreateContext.Provider value={uiContextValues}>
      <UIUpdateContext.Provider value={uiContextValues}>
        {children}
      </UIUpdateContext.Provider>
    </UICreateContext.Provider>
  );
}
