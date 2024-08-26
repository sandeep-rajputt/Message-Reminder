import { Schema } from "mongoose";
import mongoose from "mongoose";

const otpSchema = new Schema({
  number: {
    type: Number,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30m",
  },
});

const OtpData = mongoose.model("OtpData", otpSchema);

export default OtpData;
