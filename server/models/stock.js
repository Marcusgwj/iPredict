import mongoose from "mongoose";
const Schema = mongoose.Schema;
const StockSchema = new Schema({
  ticker: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", StockSchema);
