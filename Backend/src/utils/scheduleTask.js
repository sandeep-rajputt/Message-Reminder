import schedule from "node-schedule";
import moment from "moment-timezone";
import UserData from "../models/userData.model.js";
import Reminder from "../models/reminder.model.js";

function convert12To24Hour(hour12, period) {
  let hour = Number(hour12);
  const isPM = period === "PM" || period === "Pm" || period === "pm";
  const isAM = period === "AM" || period === "am" || period === "Am";

  if (isPM && hour12 !== 12) {
    hour += 12;
  } else if (isAM && hour12 === 12) {
    hour = 0;
  }
  return hour;
}

function scheduleTask(
  userId,
  jobId,
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
      deleteTask(userId, jobId, number, client);
    } else {
      schedule.scheduleJob(jobId, cronString, () => {
        client.sendMessage(number, message);
        deleteTask(userId, jobId, number, client);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteTask(userId, jobId, number, client) {
  try {
    await UserData.findByIdAndUpdate(userId, {
      $pull: { messages: { jobId: jobId } },
    });
    await Reminder.findOneAndDelete({ jobId: jobId });
    schedule.cancelJob(jobId);
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

  // Create a moment object for the scheduled time
  const scheduledTime = moment.tz({ minute, hour }, "Asia/Kolkata");

  const now = moment.tz("Asia/Kolkata");

  if (
    scheduledTime.isBefore(now) &&
    scheduledTime.isAfter(now.subtract(5, "minutes"))
  ) {
    client.sendMessage(number, message);
  }
  try {
    schedule.scheduleJob(jobId, cronString, () => {
      client.sendMessage(number, message);
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function scheduleWeeklyTask(
  jobId,
  minute,
  hour12,
  period,
  dayOfWeek,
  message,
  client,
  number
) {
  const hour = convert12To24Hour(hour12, period);
  let week = "";
  switch (dayOfWeek) {
    case "Monday" || "Mon" || "mon" || "Mon" || "1":
      week = "1";
      break;
    case "Tuesday" || "Tue" || "tue" || "Tue" || "2":
      week = "2";
      break;
    case "Wednesday" || "Wed" || "wed" || "Wed" || "3":
      week = "3";
      break;
    case "Thursday" || "Thu" || "thu" || "Thu" || "4":
      week = "4";
      break;
    case "Friday" || "Fri" || "fri" || "Fri" || "5":
      week = "5";
      break;
    case "Saturday" || "Sat" || "sat" || "Sat" || "6":
      week = "6";
      break;
    case "Sunday" || "Sun" || "sun" || "Sun" || "0":
      week = "0";
      break;
    default:
      break;
  }
  const cronString = `${minute} ${hour} * * ${week}`;

  // Create a moment object for the scheduled time
  const scheduledTime = moment.tz({ minute, hour }, "Asia/Kolkata");

  const now = moment.tz("Asia/Kolkata");

  if (
    scheduledTime.isBefore(now) &&
    scheduledTime.isAfter(now.subtract(5, "minutes"))
  ) {
    client.sendMessage(number, message);
  }
  try {
    schedule.scheduleJob(jobId, cronString, () => {
      client.sendMessage(number, message);
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function scheduleMonthlyTask(
  jobId,
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
    { minute, hour, date: dayOfMonth },
    "Asia/Kolkata"
  );

  const now = moment.tz("Asia/Kolkata");

  if (
    scheduledTime.isBefore(now) &&
    scheduledTime.isAfter(now.subtract(5, "minutes"))
  ) {
    client.sendMessage(number, message);
  }
  try {
    schedule.scheduleJob(jobId, cronString, () => {
      client.sendMessage(number, message);
    });
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
