import Reminder from "../models/reminder.model.js";
import {
  scheduleTask,
  scheduleDailyTask,
  scheduleWeeklyTask,
} from "./scheduleTask.js";

async function reScheduleTask(client) {
  const reminders = await Reminder.find();
  reminders.forEach((reminder) => {
    if (reminder.msgType === "setMsg") {
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
    } else if (reminder.msgType === "daily") {
      scheduleDailyTask(
        reminder.jobId,
        reminder.time.minute,
        reminder.time.hour,
        reminder.time.amPm,
        reminder.message,
        client,
        reminder.number
      );
    } else if (reminder.msgType === "weekly") {
      scheduleWeeklyTask(
        reminder.jobId,
        reminder.time.minute,
        reminder.time.hour,
        reminder.time.amPm,
        reminder.time.dayOfWeek,
        reminder.message,
        client,
        reminder.number
      );
    }
  });
}

export default reScheduleTask;
