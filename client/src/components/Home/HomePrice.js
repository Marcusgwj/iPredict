import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { fetchQuote } from "../../utils/api/StockApi";
import { SiTesla } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";

const HomePrice = () => {
  const { darkMode } = useContext(ThemeContext);
  const [quotes, setQuotes] = useState({});

  useEffect(() => {
    const stocks = ["AAPL", "TSLA", "GOOG"];
    const data = {};
    const updateStockOverview = async () => {
      try {
        for (const stock of stocks) {
          const result = await fetchQuote(stock);
          data[stock] = result;
        }
        setQuotes(data);
      } catch (error) {
        console.log(error);
      }
    };
    updateStockOverview();
  }, []);

  if (Object.keys(quotes).length <= 0) {
    return <div></div>;
  }

  return (
    <div
      name="price"
      className={` w-full py-32 ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-zinc-200"
      }`}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            Monitor the latest stock prices
          </h2>
          <p className="text-3xl py-6 text-gray-500">
            Sign up to create your own watchlist
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 px-2 text-center">
          <div className="border py-8 rounded-xl shadow-xl">
            <span
              className={`text-4xl font-bold ${
                quotes["AAPL"]["d"] > 0 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              ${quotes["AAPL"]["c"]}
              <div>
                <span className="text-lg xl:text-xl 2xl:text-2x">
                  {quotes["AAPL"]["d"]} <span>({quotes["AAPL"]["dp"]}%)</span>
                </span>
              </div>
            </span>
            <p className="text-xl mt-2 flex justify-center ">
              {" "}
              <AiFillApple className="h-8 mr-2 " /> AAPL
            </p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <span
              className={`text-4xl font-bold ${
                quotes["TSLA"]["d"] > 0 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              ${quotes["TSLA"]["c"]}
              <div>
                <span className="text-lg xl:text-xl 2xl:text-2x">
                  {quotes["TSLA"]["d"]} <span>({quotes["TSLA"]["dp"]}%)</span>
                </span>
              </div>
            </span>
            <p className="text-xl mt-2 flex justify-center ">
              {" "}
              <SiTesla className="h-8 mr-2 text-red-600" /> TSLA
            </p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <span
              className={`text-4xl font-bold ${
                quotes["GOOG"]["d"] > 0 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              ${quotes["GOOG"]["c"]}
              <div>
                <span className="text-lg xl:text-xl 2xl:text-2x">
                  {quotes["GOOG"]["d"]} <span>({quotes["GOOG"]["dp"]}%)</span>
                </span>
              </div>
            </span>
            <p className="text-xl mt-2 flex justify-center ">
              {" "}
              <FcGoogle className="h-8 mr-2" /> GOOG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePrice;
