import { useContext, useEffect, useState } from "react";
import { searchNews } from "../../utils/api/NewsAPI";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";
import Article from "./Article";
import { createDate, convertDateFormat } from "../../utils/helpers/date-helper";
import Header from "../Header/Header";
import formatNews from "./NewsHelper";
import Container from "@mui/material/Container";
import "./News.css";

const NewsPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);

  const formatData = (data) => {
    return formatNews(data);
  };

  useEffect(() => {
    const getDateRange = () => {
      const currentDate = new Date();
      const endDate = createDate(currentDate, 0, 0, 0, 0);
      const startDate = createDate(currentDate, -1, 0, 0, 0);
      const formattedStart = convertDateFormat(startDate);
      const formattedEnd = convertDateFormat(endDate);

      return { formattedStart, formattedEnd };
    };

    const updateChartData = async () => {
      try {
        const { formattedStart, formattedEnd } = getDateRange();
        const result = await searchNews({
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

  return (
    <div
      className={` min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className=" flex justify-start items-center">
        <Header name={stockSymbol} />
      </div>
      <Container maxWidth="md">
        <div className="content ">
          {data.length ? (
            data.map((newsItem) => (
              <Article newsItem={newsItem} key={newsItem.headline} />
            ))
          ) : (
            <h1>Not available yet</h1>
          )}
        </div>
      </Container>
    </div>
  );
};

export default NewsPage;
