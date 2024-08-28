import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
  number: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  time: {
    type: Object,
    require: true,
  },
  jobId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  msgType: {
    type: String,
    require: true,
  },
});

const Reminder = mongoose.model("Reminder", userSchema);

export default Reminder;
