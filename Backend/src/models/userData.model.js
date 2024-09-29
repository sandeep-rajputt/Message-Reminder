import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
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
      require: false,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      },
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Email already exists"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    image: {
      type: String,
      require: false,
      default: "user.png",
    },
    telegramId: {
      type: Number,
      require: false,
      unique: [true, "Telegram ID already exists"],
    },
    instagramId: {
      type: Number,
      require: false,
      unique: [true, "Instagram ID already exists"],
    },
    number: {
      type: String,
      require: false,
      unique: [true, "Whatsapp number already exists"],
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", userSchema);

export default UserData;
