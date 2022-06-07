import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PortfolioSchema = new Schema({
  stocks: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Portfolio", PortfolioSchema);
