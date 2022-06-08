import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { StockContextProvider } from "./context/StockContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <StockContextProvider>
      <ThemeContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeContextProvider>
    </StockContextProvider>
  </AuthContextProvider>
);
