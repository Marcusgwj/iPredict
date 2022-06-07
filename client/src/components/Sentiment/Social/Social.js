import { useContext, useEffect, useState } from "react";
import Card from "../../Card/Card";
import {
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import ThemeContext from "../../../context/ThemeContext";
import StockContext from "../../../context/StockContext";
import { searchSocial } from "../../../utils/api/sentiment-api";
import {
  createDate,
  convertDateFormat,
} from "../../../utils/helpers/date-helper";
import { groupData } from "./SocialHelper";
import SocialFilter from "./SocialFilter";
import Popup from "../../Popup/Popup";

const Social = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("twitter");

  const formatData = (data) => {
    return groupData(data);
  };

  useEffect(() => {
    const getDateRange = () => {
      const currentDate = new Date();
      const endDate = createDate(currentDate, 1, 0, 0, 0);
      const startDate = createDate(currentDate, -5, 0, 0, 0);

      const formattedStart = convertDateFormat(startDate);
      const formattedEnd = convertDateFormat(endDate);

      return { formattedStart, formattedEnd };
    };

    const updateChartData = async () => {
      try {
        const { formattedStart, formattedEnd } = getDateRange();
        const result = await searchSocial({
          stockSymbol,
          formattedStart,
          formattedEnd,
        });
        setData(formatData(result[filter]));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  const popupString = (
    <div>
      Social sentiment can give us some insight into the public's opinion
      regarding a stock. <br />
      This can potentially impact future stock prices and is a useful tool.{" "}
      <br />
      The data is obtained by scraping reddit and twitter. <br />
      You should not rely solely on this tool but use it together with other
      indicators.
    </div>
  );

  return (
    <Card>
      <p className="flex absolute left-2 top-0 text-lg  text-slate-400">
        Social sentiment
        <Popup content={popupString} />
      </p>

      <ul className="flex absolute top-2 right-2 z-40">
        {["reddit", "twitter"].map((item) => (
          <li key={item}>
            <SocialFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            ></SocialFilter>
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <Legend />
          <Bar
            dataKey="positiveMention"
            fill="#58b058"
            name="Positive mentions"
          />
          <Bar
            dataKey="negativeMention"
            fill="#c43b31"
            name="Negative mentions"
          />
          <ReferenceLine y={0} stroke={darkMode ? "#B1B1B1" : "#000"} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Social;
