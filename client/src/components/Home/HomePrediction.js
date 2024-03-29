import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const HomePrediction = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      name="prediction"
      className={`w-full mix-blend-overlay ${
        darkMode ? "bg-slate-900 text-white " : "bg-zinc-200 text-black"
      }`}
    >
      <div className="w-full h-[800px] absolute"></div>

      <div className="max-w-[1240px] mx-auto py-12">
        <div
          className={`text-center py-8 ${
            darkMode ? "text-slate-300" : "text-slate-700"
          }`}
        >
          <h3
            className={`text-5xl font-bold  py-8 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Stock Prediction
          </h3>
          <p className="text-3xl">
            Utilise machine learning models to gain an insight in potential
            future stock price trends.
          </p>
        </div>

        <div className="grid md:grid-cols-3">
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <span className=" px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-2xl flex justify-center">
              Long Short-Term Memory
            </span>

            <p className="text-2xl py-8 text-slate-500">
              Special kind of recurrent neural network capable of handling
              long-term dependencies.
            </p>
          </div>
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <span className=" px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-2xl flex justify-center">
              Linear Regression
            </span>

            <p className="text-2xl py-8 text-slate-500">
              Supervised learning model which finds the best fit linear line
              between the independent and dependent variable.
            </p>
          </div>
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <span className=" px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-2xl flex justify-center ">
              Support Vector Regression
            </span>
            <p className="text-2xl py-8 text-slate-500">
              Supervised learning model that analyze data for classification and
              regression analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePrediction;
