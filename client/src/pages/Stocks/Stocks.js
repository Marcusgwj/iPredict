import { useState } from "react";
import Dashboard from "../../components/stockDashboard/Dashboard";
import StockContext from "../../context/StockContext";
import ThemeContext from "../../context/ThemeContext";
import Navigation from "../../components/navbar/navbar";
function Stocks() {
  const [darkMode, setDarkMode] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Navigation />
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default Stocks;
