import { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "../Card/Card";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import ClipLoader from "react-spinners/ClipLoader";
import { ThemeContext } from "../../context/ThemeContext";
import { StockContext } from "../../context/StockContext";
import { fetchLR, fetchLSTM, fetchSVR } from "../../utils/api/PredictionAPI";

const PredictionChart = ({ setModel }) => {
  const [filter, setFilter] = useState("LSTM");
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const model = { LR: fetchLR, LSTM: fetchLSTM, SVR: fetchSVR };
  const formatData = (data) => {
    return data.Result.map((item, index) => {
      return {
        value: Number(item.toFixed(2)),
        date: index + 1,
      };
    });
  };

  useEffect(() => {
    const updateChartData = async () => {
      try {
        setLoading(true);
        const predict = model[filter];
        const result = await predict(stockSymbol);
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-2">
        {["LSTM", "LR", "SVR"].map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
                setModel(item);
              }}
            ></ChartFilter>
          </li>
        ))}
      </ul>
      {loading ? (
        <div className="flex flex-col justify-center items-center ">
          <ClipLoader size={50} speedMultiplier={0.5} color="#458a13" />
          <div>Running model</div>{" "}
        </div>
      ) : (
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={
                    data.length > 0 &&
                    data[data.length - 1]["value"] - data[0]["value"] >= 0
                      ? "#00d12a"
                      : "#d10000"
                  }
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={
                    data.length > 0 &&
                    data[data.length - 1]["value"] - data[0]["value"] >= 0
                      ? "#00d12a"
                      : "#d10000"
                  }
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
              itemStyle={darkMode ? { color: "#818cf8" } : null}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#312e81"
              fill="url(#chartColor)"
              fillOpacity={1}
              strokeWidth={0.5}
            />
            <XAxis dataKey="date" tick={{ fontSize: 13 }} />
            <YAxis domain={["dataMin", "dataMax"]} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default PredictionChart;
