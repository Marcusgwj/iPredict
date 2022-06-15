import Navbar from "../Navbar/Navbar";
import Stock from "./Stock";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Watchlist.css";

const WatchlistPage = () => {
  const { darkMode } = useContext(ThemeContext);

  const stocks = [
    {
      market_cap_rank: 1,
      symbol: "AAPL",
      current_price: 138,
      price_change_percentage_24h: 5,
      change: 500,
      market_cap: 200,
    },
  ];
  return (
    <div
      className={`min-h-screen text-gray-300 ${
        darkMode ? "bg-gray-900 " : "bg-neutral-100"
      }`}
    >
      <div className={`watch-container }`}>
        <div>
          <div className="watch-heading">
            <p>#</p>
            <p className="coin-name">Ticker</p>
            <p>Price</p>
            <p>Change (%)</p>
            <p className="hide-mobile">Change</p>
            <p className="hide-mobile">Mkt Cap</p>
          </div>
          {stocks.map((stocks) => {
            return <Stock stocks={stocks} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
