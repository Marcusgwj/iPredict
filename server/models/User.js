import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio",
  },
});

export default mongoose.model("User", UserSchema);
