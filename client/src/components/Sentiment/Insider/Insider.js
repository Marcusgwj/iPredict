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
  Cell,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { StockContext } from "../../../context/StockContext";
import { searchInsider } from "../../../utils/api/SentimentApi";
import {
  createDate,
  convertDateFormat,
  convertNumbertoMonth,
} from "../../../utils/helpers/date-helper";
import Popup from "../../Popup/Popup";

const Insider = () => {
  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  const [data, setData] = useState([]);

  const formatData = (data) => {
    return data.data.map((item) => {
      return {
        date: `${convertNumbertoMonth(item.month)} ${item.year}`,
        mpsr: item.mspr,
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const endDate = new Date();
      const startDate = createDate(endDate, 0, 0, -5, 0);

      const formattedStart = convertDateFormat(startDate);
      const formattedEnd = convertDateFormat(endDate);

      return { formattedStart, formattedEnd };
    };

    const updateChartData = async () => {
      try {
        const { formattedStart, formattedEnd } = getDateRange();
        const result = await searchInsider({
          stockSymbol,
          formattedStart,
          formattedEnd,
        });
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol]);

  const popupString = (
    <p>
      Insider sentiment give us some insight into the executives's opinion
      regarding their company's stock. <br />
      This is measured using{" "}
      <a href="https://bit.ly/3mn7lKI">Monthly Share Purchase Ratio.</a>
      <br />
      Insider sentiment is considered positive if its corporate’s shares are
      under net purchasing activity. <br />
      You should not rely solely on this tool but use it together with other
      indicators.
    </p>
  );

  return (
    <Card>
      <div className="flex absolute left-2 top-0 text-lg  text-slate-400">
        Insider sentiment
        <Popup content={popupString}> </Popup>
      </div>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <Legend />
          <Bar dataKey="mpsr" name="Monthly Share Purchase Ratio">
            {data.map((datum, entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={datum.mpsr > 0 ? "#58b058" : "#c43b31"}
              />
            ))}
          </Bar>
          <ReferenceLine y={0} stroke={darkMode ? "#B1B1B1" : "#000"} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Insider;
