import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../Header/Header";
import { StockContext } from "../../context/StockContext";
import PredictionChart from "./PredictionChart";
import About from "./About";

const PredictionsPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [model, setModel] = useState(["LR"]);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 md:grid-rows-7 xl:grid-cols-6  xl:grid-rows-8 auto-rows-fr gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 xl:col-start-2 flex justify-start items-center ">
        <Header name={stockSymbol} />
      </div>
      <div className="md:col-span-2 row-span-5 xl:col-start-2 xl:col-span-4 ">
        <PredictionChart setModel={setModel} />
      </div>
      <div className="text-sm row-span-3 md:col-span-2 md:row-span-2 md:text-base  xl:col-start-2 xl:col-span-4 ">
        <About model={model} />
      </div>
    </div>
  );
};

export default PredictionsPage;
