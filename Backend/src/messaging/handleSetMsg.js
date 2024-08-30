import client from "./client.js";
import UserData from "../models/userData.model.js";
import checkDate from "../utils/checkDate.js";
import reactUniqueIds from "react-unique-ids";
import { scheduleTask } from "../utils/scheduleTask.js";
import Reminder from "../models/reminder.model.js";

async function handleSetMsg(message, client) {
  const chat = await message.getChat();
  const user = await UserData.findOne({ number: message.from });
  const userMessages = user.messages;
  if (user.premium === false && userMessages.length > 4) {
    chat.sendMessage(
      "You can set up to 5 reminders. To increase your limit, please use the /upgrade option."
    );
  }
  const date = `${message.body.split(" ")[1]} ${message.body.split(" ")[2]}`;
  const userMsg = message.body.split(" ").slice(3).join(" ");
  try {
    checkDate("setmsg", date);
    const jobId = reactUniqueIds({
      length: 5,
      uppercase: true,
      lowercase: true,
      symbol: false,
      number: true,
    });
    const year = `20${date.split("/")[2].split(" ")[0]}`;
    const month = date.split("/")[1];
    const day = date.split("/")[0];
    const hour = date.split(" ")[1].split(":")[0];
    const minute = date.split(" ")[1].slice(3, 5);
    const amPm = date.split(" ")[1].slice(5, 7);
    scheduleTask(
      user._id,
      jobId,
      minute,
      hour,
      amPm,
      day,
      month,
      userMsg,
      client,
      message.from
    );

    const newReminder = new Reminder({
      number: message.from,
      message: userMsg,
      userId: user._id,
      time: {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        amPm: amPm,
      },
      jobId: jobId,
      msgType: "setMsg",
    });
    await newReminder.save();
    user.messages.push({
      jobId: jobId,
      message: userMsg,
      date: date,
    });
    await user.save();
    chat.sendMessage("I will notify you at your specified time.");
  } catch (error) {
    console.log(error);
    chat.sendMessage(error.message);
    return;
  }
}

export default handleSetMsg;
