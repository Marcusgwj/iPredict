import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { searchNews } from "../../utils/api/NewsAPI";
import formatNews from "../News/NewsHelper";
import { createDate, convertDateFormat } from "../../utils/helpers/date-helper";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
import { AiFillApple } from "react-icons/ai";
import { SiTesla } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

import wallStreet from "../../assets/wallStreet.jpg";

const HomeNews = () => {
  const { darkMode } = useContext(ThemeContext);
  const [data, setData] = useState([]);

  const formatData = (data) => {
    return formatNews(data);
  };

  useEffect(() => {
    const stocks = ["AAPL", "TSLA", "GOOG"];
    const data = [];

    const getDateRange = () => {
      const currentDate = new Date();
      const endDate = createDate(currentDate, 0, 0, 0, 0);
      const startDate = createDate(currentDate, -1, 0, 0, 0);
      const formattedStart = convertDateFormat(startDate);
      const formattedEnd = convertDateFormat(endDate);
      return { formattedStart, formattedEnd };
    };

    const updateNewsData = async () => {
      try {
        const { formattedStart, formattedEnd } = getDateRange();
        for (const stockSymbol of stocks) {
          const result = await searchNews({
            stockSymbol,
            formattedStart,
            formattedEnd,
          });
          data.push(result[0]);
        }
        setData(formatData(data));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };
    updateNewsData();
  }, []);

  if (Object.keys(data).length <= 0) {
    return <div></div>;
  }

  return (
    <div
      name="news"
      className={` w-full pt-24 ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-zinc-200"
      }`}
    >
      <div
        className={`w-full h-[700px] absolute ${
          darkMode ? "bg-gray-600/90 text-gray-300" : "bg-gray-900/90"
        } `}
      >
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src={wallStreet}
          alt="/"
        />
      </div>

      <div className="max-w-[1240px] mx-auto text-white relative">
        <div className="px-4 py-12">
          <h3 className="text-5xl font-bold py-12 text-center">
            Breaking News
          </h3>
          <p className="py-4 text-3xl text-slate-300 text-center">
            Keep up to date with the latest news
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-32 text-black">
          <div className="bg-white rounded-xl shadow-2xl flex flex-col justify-between">
            <div className="p-8">
              <AiFillApple className="h-16 w-16 p-4 bg-indigo-600 text-gray-300 rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">{data[0]["headline"]}</h3>
              <p className="text-gray-600 object-contain">
                {data[0]["summary"]}
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600">
                Read more <ArrowSmRightIcon className="w-5 mt-1 mx-2" />{" "}
                <a href={data[0]["url"]} target="__blank">
                  <b>{data[0]["source"]}</b>
                </a>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl flex flex-col justify-between">
            <div className="p-8">
              <SiTesla className="h-16 w-16 p-4 bg-indigo-600 text-red-600 rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">{data[1]["headline"]}</h3>
              <p className="text-gray-600 object-contain">
                {data[1]["summary"]}
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4 ">
              <p className="flex items-center text-indigo-600 ">
                Read more
                <ArrowSmRightIcon className="w-5 mt-1 mx-2" />{" "}
                <a href={data[1]["url"]} target="__blank">
                  <b>{data[1]["source"]}</b>
                </a>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl flex flex-col justify-between">
            <div className="p-8">
              <FcGoogle className="h-16 w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-2xl my-6">{data[2]["headline"]}</h3>
              <p className="text-gray-600 object-contain">
                {data[2]["summary"]}
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4 ">
              <p className="flex items-center text-indigo-600">
                Read more <ArrowSmRightIcon className="w-5 mt-1 mx-2" />{" "}
                <a href={data[2]["url"]} target="__blank">
                  <b>{data[2]["source"]}</b>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNews;
