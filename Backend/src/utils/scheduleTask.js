import cron from "node-cron";
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

  const scheduledTime = moment.tz(
    { minute, hour, date: dayOfMonth },
    "Asia/Kolkata"
  );
  const now = moment.tz("Asia/Kolkata");

  try {
    if (scheduledTime.isBefore(now)) {
      client.sendMessage(number, message);
      deleteTask(userId, jobId, number, client);
    } else {
      cron.schedule(
        cronString,
        () => {
          client.sendMessage(number, message);
          deleteTask(userId, jobId, number, client);
        },
        {
          scheduled: true,
          timezone: "Asia/Kolkata",
        }
      );
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
    // Use cron's ability to stop the job as necessary
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

  const scheduledTime = moment.tz({ minute, hour }, "Asia/Kolkata");
  const now = moment.tz("Asia/Kolkata");

  if (
    scheduledTime.isBefore(now) &&
    scheduledTime.isAfter(now.subtract(5, "minutes"))
  ) {
    client.sendMessage(number, message);
  }
  try {
    cron.schedule(
      cronString,
      () => {
        client.sendMessage(number, message);
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata",
      }
    );
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

  switch (dayOfWeek.toLowerCase()) {
    case "monday":
    case "mon":
    case "1":
      week = "1";
      break;
    case "tuesday":
    case "tue":
    case "2":
      week = "2";
      break;
    case "wednesday":
    case "wed":
    case "3":
      week = "3";
      break;
    case "thursday":
    case "thu":
    case "4":
      week = "4";
      break;
    case "friday":
    case "fri":
    case "5":
      week = "5";
      break;
    case "saturday":
    case "sat":
    case "6":
      week = "6";
      break;
    case "sunday":
    case "sun":
    case "0":
      week = "0";
      break;
    default:
      break;
  }

  const cronString = `${minute} ${hour} * * ${week}`;
  const scheduledTime = moment.tz({ minute, hour }, "Asia/Kolkata");
  const now = moment.tz("Asia/Kolkata");

  if (
    scheduledTime.isBefore(now) &&
    scheduledTime.isAfter(now.subtract(5, "minutes"))
  ) {
    client.sendMessage(number, message);
  }
  try {
    cron.schedule(
      cronString,
      () => {
        client.sendMessage(number, message);
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata",
      }
    );
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
    cron.schedule(
      cronString,
      () => {
        client.sendMessage(number, message);
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata",
      }
    );
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
