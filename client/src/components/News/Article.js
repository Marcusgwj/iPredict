import "./Article.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import noImage from "./no-image.png";

const NewsCard = ({ newsItem }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <a href={newsItem.url} target="__blank" className="w-full">
      <div className={darkMode ? "newsCard" : "lightNewsCard"}>
        <img
          alt={newsItem.source}
          src={newsItem.image ? newsItem.image : noImage}
          className="newsImage"
        />
        <div className="newsText">
          <div>
            <span className="title">{newsItem.headline}</span>
            <br />
            <span className={darkMode ? "author" : "lightAuthor"}>
              <span className="muted">
                {" "}
                By {newsItem.source ? newsItem.source : "unknown"} -{" "}
                {newsItem.datetime}
              </span>
            </span>
          </div>
          <div className="lowerNewsText">
            <div className={darkMode ? "description" : "lightDescription"}>
              {newsItem.summary}
            </div>
            <span className="readmore">
              Read more at <b>{newsItem.source}</b>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
