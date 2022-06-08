import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Insider from "./Insider/Insider";
import Social from "./Social/Social";
import Header from "../Header/Header";
import { StockContext } from "../../context/StockContext";

const SentimentPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockSymbol} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Insider />
      </div>

      <div className="md:col-span-2 row-span-4">
        <Social />
      </div>
    </div>
  );
};

export default SentimentPage;
