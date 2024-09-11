import mongoose from "mongoose";

const expiredTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const ExpiredToken = mongoose.model("ExpiredToken", expiredTokenSchema);

export default ExpiredToken;
