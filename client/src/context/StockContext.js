import { createContext, useState } from "react";

export const StockContext = createContext();

export const StockContextProvider = ({ children }) => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");

  return (
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      {children}
    </StockContext.Provider>
  );
};
