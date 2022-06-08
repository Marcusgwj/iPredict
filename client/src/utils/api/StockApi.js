const basePath = "https://finnhub.io/api/v1";

// Search for stocks based on user query
export const searchSymbol = async (query) => {
  const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_FINNHUB}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

// Fetch details of a given company
export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_FINNHUB}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

// Fetch latest quote of stock
export const fetchQuote = async (stockSymbol) => {
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_FINNHUB}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

// Fetch historical data of stock
export const fetchHistoricalData = async (
  stockSymbol,
  resolution,
  from,
  to
) => {
  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
