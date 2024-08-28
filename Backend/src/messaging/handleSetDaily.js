import checkDate from "../utils/checkDate.js";
import reactUniqueIds from "react-unique-ids";
import { scheduleDailyTask } from "../utils/scheduleTask.js";
import Reminder from "../models/reminder.model.js";
import UserData from "../models/userData.model.js";

async function handleSetDaily(message, client) {
  const chat = await message.getChat();
  const user = await UserData.findOne({ number: message.from });
  const userMessages = user.messages;
  if (userMessages.length > 40) {
    chat.sendMessage(
      "You can set up to 5 reminders. To increase your limit, please use the /upgrade option."
    );
  } else {
    const date = `${message.body.split(" ")[1]}`;
    const userMsg = message.body.split(" ").slice(2).join(" ");
    try {
      checkDate("setdaily", date);
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
      scheduleDailyTask(
        jobId,
        minute,
        hour,
        amPm,
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
        },
        jobId: jobId,
        msgType: "daily",
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
}

export default handleSetDaily;
