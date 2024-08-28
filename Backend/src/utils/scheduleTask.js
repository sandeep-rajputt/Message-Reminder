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
  message,
  client,
  number
) {
  const hour = convert12To24Hour(hour12, period);
  const cronString = `${minute} ${hour} ${dayOfMonth} ${month} *`;

  // Create a moment object for the scheduled time
  const scheduledTime = moment.tz(
    { minute, hour, date: dayOfMonth, month: month - 1 },
    "Asia/Kolkata"
  );

  const now = moment.tz("Asia/Kolkata");

  try {
    if (scheduledTime.isBefore(now)) {
      client.sendMessage(number, message);
      deleteTask(userId, id, number, client);
    } else {
      schedule.scheduleJob(id, cronString, () => {
        client.sendMessage(number, message);
        deleteTask(userId, id, number, client);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteTask(userId, id, number, client) {
  try {
    await UserData.findByIdAndUpdate(userId, {
      $pull: { messages: { jobId: id } },
    });
    await Reminder.findOneAndDelete({ jobId: id });
    schedule.cancelJob(id);
  } catch (error) {
    console.error("Error deleting task:", error);
    client.sendMessage(number, error);
  }
}

async function scheduleDailyTask(
  jobId,
  minute,
  hour12,
  period,
  message,
  client,
  number
) {
  const hour = convert12To24Hour(hour12, period);
  const cronString = `${minute} ${hour} * * *`;

  try {
    schedule.scheduleJob(jobId, cronString, () => {
      client.sendMessage(number, message);
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function scheduleWeeklyTask(
  id,
  minute,
  hour12,
  period,
  dayOfWeek,
  message,
  client,
  number
) {
  const hour = convert12To24Hour(hour12, period);
  const week = "";
  switch (dayOfWeek) {
    case "Monday" || "Mon" || "mon" || "Mon":
      week = "1";
      break;
    case "Tuesday" || "Tue" || "tue" || "Tue":
      week = "2";
      break;
    case "Wednesday" || "Wed" || "wed" || "Wed":
      week = "3";
      break;
    case "Thursday" || "Thu" || "thu" || "Thu":
      week = "4";
      break;
    case "Friday" || "Fri" || "fri" || "Fri":
      week = "5";
      break;
    case "Saturday" || "Sat" || "sat" || "Sat":
      week = "6";
      break;
    case "Sunday" || "Sun" || "sun" || "Sun":
      week = "0";
      break;
    default:
      break;
  }
  const cronString = `${minute} ${hour} * * ${week}`;

  // Create a moment object for the scheduled time
  const scheduledTime = moment.tz({ minute, hour }, "Asia/Kolkata");

  const now = moment.tz("Asia/Kolkata");

  try {
    if (
      scheduledTime.isBefore(now) &&
      scheduledTime.isAfter(now.subtract(5, "minutes"))
    ) {
      client.sendMessage(number, message);
    } else {
      schedule.scheduleJob(id, cronString, () => {
        client.sendMessage(number, message);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function scheduleMonthlyTask(
  userId,
  id,
  minute,
  hour12,
  period,
  dayOfMonth,
  message,
  client,
  number
) {
  const hour = convert12To24Hour(hour12, period);
  const cronString = `${minute} ${hour} ${dayOfMonth} * *`;

  // Create a moment object for the scheduled time
  const scheduledTime = moment.tz(
    { minute, hour, date: dayOfMonth, month: month - 1 },
    "Asia/Kolkata"
  );

  const now = moment.tz("Asia/Kolkata");

  try {
    if (scheduledTime.isBefore(now)) {
      client.sendMessage(number, message);
    } else {
      schedule.scheduleJob(id, cronString, () => {
        client.sendMessage(number, message);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

export {
  scheduleTask,
  deleteTask,
  scheduleDailyTask,
  scheduleWeeklyTask,
  scheduleMonthlyTask,
};