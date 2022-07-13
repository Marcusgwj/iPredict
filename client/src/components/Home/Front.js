import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmojiHappyIcon, SearchIcon } from "@heroicons/react/solid";
import money from "../../assets/money.png";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import ArticleIcon from "@mui/icons-material/Article";

const Front = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div
      name="front"
      className={` w-full h-screen flex flex-col justify-between ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-zinc-200"
      }`}
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
          <h1 className="py-3 text-5xl md:text-7xl font-bold">iPredict</h1>
          <p className="text-2xl">Make more informed investment decisions.</p>
          {user ? (
            <></>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="py-3 px-6 sm:w-[60%] my-4  border text-white bg-indigo-600 border-indigo-600 
                  hover:bg-transparent hover:text-indigo-600 rounded-md"
            >
              Sign up
            </button>
          )}
        </div>
        <div>
          <img className="w-full" src={money} alt="/" />
        </div>
        <div
          className={`absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
            mx-1 md:left-1/2 transform md:-translate-x-1/2 translate-y-1/2 border rounded-xl text-center shadow-xl ${
              darkMode
                ? "bg-gray-900 text-gray-300 border-gray-800"
                : "bg-zinc-200 text-slate-700 border-slate-300"
            }`}
        >
          <div className="flex justify-between flex-wrap px-4 ">
            <p className="flex px-4 py-2 ">
              <CandlestickChartIcon className="h-6 text-indigo-600" /> Charts
            </p>
            <p className="flex px-4 py-2 ">
              <ArticleIcon className="h-6 text-indigo-600" /> Latest News
            </p>
            <p className="flex px-4 py-2 ">
              <EmojiHappyIcon className="h-6 text-indigo-600" /> Sentiment
            </p>
            <p className="flex px-4 py-2 ">
              <SearchIcon className="h-6 text-indigo-600" /> Price predictions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;
