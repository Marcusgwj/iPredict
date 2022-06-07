import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Stocks from "./pages/Stocks/Stocks";
import Stock from "./pages/Stock/Stock";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import News from "./pages/News/News";
import Sentiment from "./pages/Sentiment/Sentiment";

import { useState } from "react";
import StockContext from "./context/StockContext";
import ThemeContext from "./context/ThemeContext";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/stocks/:id" element={<Stock />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/news" element={<News />} />
            <Route path="/sentiment" element={<Sentiment />} />
          </Routes>
        </BrowserRouter>
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
