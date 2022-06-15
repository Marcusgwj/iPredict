import mongoose from "mongoose";
const Schema = mongoose.Schema;
const WatchlistSchema = new Schema({
  stocks: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Watchlist", WatchlistSchema);
