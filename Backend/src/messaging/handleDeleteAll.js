import { deleteTask } from "../utils/scheduleTask.js";
import UserData from "../models/userData.model.js";
import Reminder from "../models/reminder.model.js";

async function handleDeleteAll(message, client) {
  const chat = await message.getChat();
  const user = await UserData.findOne({ number: message.from });
  try {
    user.messages.forEach((message) => {
      deleteTask(user._id, message.jobId, message.number, client, true);
    });

    user.messages = [];
    await user.save();
    await Reminder.deleteMany({ userId: user._id });
    chat.sendMessage("All reminders deleted.");
  } catch (error) {
    console.error("Error deleting all reminders:", error);
    chat.sendMessage("Error deleting all reminders. Please try again later.");
  }
}

export default handleDeleteAll;
