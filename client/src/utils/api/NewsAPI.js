const basePath = "https://finnhub.io/api/v1";

// Search for news based on user stock
export const searchNews = async (newsData) => {
  const { stockSymbol, formattedStart, formattedEnd } = newsData;
  const url = `${basePath}/company-news?symbol=${stockSymbol}&from=${formattedStart}&to=${formattedEnd}&token=${process.env.REACT_APP_FINNHUB}`;
  const response = await fetch(url);
  console.log(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
