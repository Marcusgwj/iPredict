import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import axiosInstance from "../../utils/config";
const AddSearchResults = ({ results, clear }) => {
  const { darkMode } = useContext(ThemeContext);
  const addToWatchList = async (stock) => {
    await axiosInstance.post("/api/watchlist/addStocks", { stock });
  };

  return (
    <ul
      className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${
        darkMode
          ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark"
          : "bg-white border-neutral-200 custom-scrollbar"
      }`}
    >
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
              darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200 "
            } transition duration-300`}
            onClick={() => {
              addToWatchList(item.symbol);
              clear();
            }}
          >
            <span>{item.symbol}</span>
            <span className="text-right">{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default AddSearchResults;
