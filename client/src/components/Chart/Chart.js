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
import { ThemeContext } from "../../context/ThemeContext";
import { StockContext } from "../../context/StockContext";
import { fetchHistoricalData } from "../../utils/api/StockApi";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixToShortDate,
} from "../../utils/helpers/date-helper";
import { chartConfig } from "../../constants/ChartConfig";

const Chart = () => {
  const [filter, setFilter] = useState("1W");

  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  const [data, setData] = useState([]);

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: Number(item.toFixed(2)),
        date: convertUnixToShortDate(data.t[index]),
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];

      let endDate = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        })
      );

      const day = endDate.getDay();
      if (day === 0) {
        endDate = createDate(endDate, -2, 0, 0, 0);
      }
      if (day === 6) {
        endDate = createDate(endDate, -1, 0, 0, 0);
      }

      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };
    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-1">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
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
    </Card>
  );
};

export default Chart;
