import { useContext, useEffect, useState } from "react";
import { searchNews } from "../../utils/api/NewsAPI";
import { ThemeContext } from "../../context/ThemeContext";
import { StockContext } from "../../context/StockContext";
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
  const [previous, setPrevious] = useState(-1);

  const formatData = (data) => {
    return formatNews(data);
  };

  const getDateRange = (previous) => {
    const currentDate = new Date();
    const endDate = createDate(currentDate, 0, 0, 0, 0);
    const startDate = createDate(currentDate, previous, 0, 0, 0);
    const formattedStart = convertDateFormat(startDate);
    const formattedEnd = convertDateFormat(endDate);

    return { formattedStart, formattedEnd };
  };

  const updateNewsData = async () => {
    try {
      const { formattedStart, formattedEnd } = getDateRange(previous);
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

  useEffect(() => {
    setPrevious(-1);
    updateNewsData();
  }, [stockSymbol]);

  useEffect(() => {
    updateNewsData();
  }, [previous]);

  return (
    <div
      className={` min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className=" header">
        <Header name={stockSymbol} />
      </div>
      <Container maxWidth="md">
        <div className="content ">
          {data.length ? (
            data.map((newsItem) => (
              <Article newsItem={newsItem} key={newsItem.headline} />
            ))
          ) : (
            <h1>No latest news</h1>
          )}

          <button
            className={` w-full  font-bold mt-2 py-2 px-4 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-800  text-gray-300"
                : "bg-neutral-200  hover:bg-neutral-300"
            }`}
            onClick={() => setPrevious(previous - 1)}
          >
            Load previous day
          </button>
        </div>
      </Container>
    </div>
  );
};

export default NewsPage;
