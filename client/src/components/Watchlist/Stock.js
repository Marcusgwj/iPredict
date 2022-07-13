import "./Watchlist.css";
import { FaTimes } from "react-icons/fa";
import { fetchQuote } from "../../utils/api/StockApi";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/config";

const Stock = (props) => {
  const { stockSymbol, index } = props;

  const [stock, setStock] = useState({});

  const removeWatchList = async (stock) => {
    await axiosInstance.post("/watchlist/removeStocks", { stock });
  };

  useEffect(() => {
    const formatData = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        const data = {
          number: index + 1,
          symbol: stockSymbol,
          current: result.c,
          percentage: result.dp,
          change: result.d,
        };
        setStock(data);
      } catch (error) {
        console.log(error);
        removeWatchList(stockSymbol);
      }
    };
    formatData();
  }, [stockSymbol, index]);

  if (Object.keys(stock).length <= 0) {
    return <div></div>;
  }

  return (
    <div className="stock-row">
      <p>{stock.number}</p>
      <p className="ticker">{stock.symbol}</p>
      <p className="price">${stock.current}</p>
      <p
        className={`percent ${
          stock.percentage >= 0 ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {stock.percentage.toFixed(2)}%
      </p>
      <p
        className={`change ${
          stock.change >= 0 ? "text-emerald-500" : "text-red-500"
        }`}
      >
        ${stock.change}
      </p>
      <FaTimes
        className="times"
        onClick={() => removeWatchList(stock.symbol)}
      />
    </div>
  );
};

export default Stock;
