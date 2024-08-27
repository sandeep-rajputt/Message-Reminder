import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    number: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      default: "Unknown User",
    },
    messages: {
      type: Array,
      default: [],
    },
    premium: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", userSchema);

export default UserData;
