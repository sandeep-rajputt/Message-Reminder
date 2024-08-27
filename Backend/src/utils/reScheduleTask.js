import Reminder from "../models/reminder.model.js";
import { scheduleTask } from "./scheduleTask.js";

async function reScheduleTask(client) {
  const reminders = await Reminder.find();
  reminders.forEach((reminder) => {
    scheduleTask(
      reminder.userId,
      reminder.jobId,
      reminder.time.minute,
      reminder.time.hour,
      reminder.time.amPm,
      reminder.time.dayOfMonth,
      reminder.time.month,
      reminder.time.dayOfWeek,
      reminder.message,
      client,
      reminder.number
    );
  });
}

export default reScheduleTask;
