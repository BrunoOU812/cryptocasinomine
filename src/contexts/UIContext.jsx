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

  const setDepositResponse = (response) => {
    setDepositResponses([...depositResponses, response]);
  };

  const toggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const uiContextValues = {
    isExpanded: isExpanded,
    toggleExpanded: toggleExpanded,
    customerData: customerData, // Agregar los datos del cliente al contexto
    depositResponses: depositResponses, // Agregar las respuestas de depósito al contexto
    setDepositResponse: setDepositResponse, // Agregar la función de agregar respuestas de depósito al contexto
  };

  return (
    <UICreateContext.Provider value={uiContextValues}>
      <UIUpdateContext.Provider value={uiContextValues}>
        {children}
      </UIUpdateContext.Provider>
    </UICreateContext.Provider>
  );
}
