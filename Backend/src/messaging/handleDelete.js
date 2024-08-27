import { deleteTask } from "../utils/scheduleTask.js";
import Reminder from "../models/reminder.model.js";

async function handleDelete(message, client) {
  const chat = await message.getChat();
  const jobId = message.body.split(" ")[1];

  try {
    const job = await Reminder.findOne({ jobId });
    if (!job) {
      chat.sendMessage("Reminder not found.");
      return;
    } else {
      await deleteTask(job.userId, job.jobId, job.number, client, true);
      chat.sendMessage(`Reminder with id ${jobId} deleted.`);
    }
  } catch (error) {
    console.error("Error deleting reminder:", error);
    chat.sendMessage("Error deleting reminder. Please try again later.");
  }
}

export default handleDelete;
