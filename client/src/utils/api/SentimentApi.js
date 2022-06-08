const basePath = "https://finnhub.io/api/v1";

// Search for insider sentiment based on user query
export const searchInsider = async (insiderData) => {
  const { stockSymbol, formattedStart, formattedEnd } = insiderData;
  const url = `${basePath}/stock/insider-sentiment?symbol=${stockSymbol}&from=${formattedStart}&to=${formattedEnd}&token=${process.env.REACT_APP_FINNHUB}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

// Search for social sentiment based on user query
export const searchSocial = async (socialData) => {
  const { stockSymbol, formattedStart, formattedEnd } = socialData;
  const url = `${basePath}/stock/social-sentiment?symbol=${stockSymbol}&from=${formattedStart}&to=${formattedEnd}&token=${process.env.REACT_APP_FINNHUB}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
