import checkDate from "../utils/checkDate.js";
import reactUniqueIds from "react-unique-ids";
import { scheduleWeeklyTask } from "../utils/scheduleTask.js";
import Reminder from "../models/reminder.model.js";
import UserData from "../models/userData.model.js";

async function handleSetWeekly(message, client) {
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
    checkDate("setweekly", date);
    const jobId = reactUniqueIds({
      length: 5,
      uppercase: true,
      lowercase: true,
      symbol: false,
      number: true,
    });
    const hour = date.split(":")[0];
    const minute = date.split(":")[1].slice(0, 2);
    const amPm = date.split(":")[1].slice(2, 4);
    // HH:MM Day
    const dayOfWeek = date.split(" ")[2];
    scheduleWeeklyTask(
      jobId,
      minute,
      hour,
      amPm,
      dayOfWeek,
      userMsg,
      client,
      message.from
    );

    const newReminder = new Reminder({
      number: message.from,
      message: userMsg,
      time: {
        hour: hour,
        minute: minute,
        amPm: amPm,
        dayOfWeek: dayOfWeek,
      },
      jobId: jobId,
      msgType: "weekly",
      userId: user._id,
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
    chat.sendMessage(error.message);
    return;
  }
}

export default handleSetWeekly;
