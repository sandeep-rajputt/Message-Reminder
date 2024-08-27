import schedule from "node-schedule";
import moment from "moment-timezone";
import UserData from "../models/userData.model.js";
import Reminder from "../models/reminder.model.js";

function convert12To24Hour(hour12, period) {
  let hour = Number(hour12);
  if (period === "PM" && hour12 !== 12) {
    hour += 12;
  } else if (period === "AM" && hour12 === 12) {
    hour = 0;
  }
  return hour;
}

function scheduleTask(
  userId,
  id,
  minute,
  hour12,
  period,
  dayOfMonth,
  month,
  dayOfWeek,
  message,
  client,
  number
) {
  const hour = convert12To24Hour(hour12, period);
  const cronString = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  // Create a moment object for the scheduled time
  const scheduledTime = moment.tz(
    { minute, hour, date: dayOfMonth, month: month - 1 },
    "Asia/Kolkata"
  );

  const now = moment.tz("Asia/Kolkata");

  if (scheduledTime.isBefore(now)) {
    client.sendMessage(number, message);
    deleteTask(userId, id, number, client);
  } else {
    schedule.scheduleJob(id, cronString, () => {
      client.sendMessage(number, message);
      deleteTask(userId, id, number, client);
    });
  }
}

async function deleteTask(userId, id, number, client) {
  try {
    await UserData.findByIdAndUpdate(userId, {
      $pull: { messages: { jobId: id } },
    });
    await Reminder.findOneAndDelete({ jobId: id });
    schedule.cancelJob(id);
    client.sendMessage(number, `Task ${id} deleted.`);
  } catch (error) {
    console.error("Error deleting task:", error);
    client.sendMessage(number, error);
  }
}

export { scheduleTask, deleteTask };
