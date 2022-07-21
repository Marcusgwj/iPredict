import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { StockContextProvider } from "./context/StockContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { ProfileContextProvider } from "./context/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ProfileContextProvider>
      <StockContextProvider>
        <ThemeContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ThemeContextProvider>
      </StockContextProvider>
    </ProfileContextProvider>
  </AuthContextProvider>
);
