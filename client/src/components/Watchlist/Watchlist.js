import Stock from "./Stock";
import Add from "./Add";
import { useContext, useState, useEffect } from "react";
import axiosInstance from "../../utils/config";
import { ThemeContext } from "../../context/ThemeContext";
import "./Watchlist.css";
import { useNavigate } from "react-router-dom";

const WatchlistPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateStocksData = async () => {
      try {
        const result = await axiosInstance.get("/api/watchlist/getStocks");
        setStocks(result.data);
      } catch (error) {
        setStocks([]);
        console.log(error);
        if (error.request.status === 401) {
          navigate("/signin", { replace: true });
        }
      }
    };
    updateStocksData();
  }, [stocks, navigate]);

  return (
    <div
      className={`min-h-screen text-gray-300 ${
        darkMode ? "bg-gray-900 " : "bg-zinc-200"
      }`}
    >
      <div className="watch-container">
        <div>
          <div className="watch-heading">
            <p>#</p>
            <p className="ticker">Ticker</p>
            <p className="price">Price</p>
            <p className="percent">Change (%)</p>
            <p className="change">Change</p>
          </div>
          {stocks.length > 0 &&
            stocks.map((stockSymbol, index) => {
              return (
                <Stock key={index} stockSymbol={stockSymbol} index={index} />
              );
            })}
          <Add />
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
