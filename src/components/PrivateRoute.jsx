import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUI } from "../contexts/UIContext";
export default function PrivateRoute() {
  const { logged } = useUI();
  return logged ? <Outlet /> : <Navigate to="/signin" />;
}
