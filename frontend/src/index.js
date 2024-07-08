import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

export const AxiosContext = createContext();
export const UserContext = createContext();

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3300",
});

const user = localStorage.getItem("token")
  ? jwtDecode(localStorage.getItem("token"))
  : null;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AxiosContext.Provider value={instance}>
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </AxiosContext.Provider>
  </React.StrictMode>
);
