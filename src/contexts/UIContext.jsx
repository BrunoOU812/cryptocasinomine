import React, { createContext, useContext, useState } from "react";

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
  const toggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const uiContextValues = {
    isExpanded: isExpanded,
    toggleExpanded: toggleExpanded,
  };

  return (
    <UICreateContext.Provider value={uiContextValues}>
      <UIUpdateContext.Provider value={uiContextValues}>
        {children}
      </UIUpdateContext.Provider>
    </UICreateContext.Provider>
  );
}
