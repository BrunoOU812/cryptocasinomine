import React from "react";
import { Route, useLocation } from "react-router-dom";
import DepositHeader from "./DepositHeader";

export function DepositRouter() {
  const location = useLocation();
  const isDepositRoute = location.pathname === "/deposit";

  return isDepositRoute ? <DepositHeader /> : null;
}
