import { convertUnixTimestampToDate } from "../../utils/helpers/date-helper";
const formatNews = (data) => {
  return data.map((item) => {
    return {
      datetime: convertUnixTimestampToDate(item.datetime),
      headline: item.headline,
      image: item.image,
      source: item.source,
      summary: item.summary,
      url: item.url,
    };
  });
};

export default formatNews;
