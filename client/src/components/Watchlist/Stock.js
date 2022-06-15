import "./Watchlist.css";

const Stock = (props) => {
  return (
    <div className="coin-row">
      <p>{props.stocks.market_cap_rank}</p>
      <div>
        <p>{props.stocks.symbol.toUpperCase()}</p>
      </div>
      <p>${props.stocks.current_price.toLocaleString()}</p>
      <p>{props.stocks.price_change_percentage_24h.toFixed(2)}%</p>
      <p className="hide-mobile">${props.stocks.change.toLocaleString()}</p>
      <p className="hide-mobile">${props.stocks.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default Stock;
