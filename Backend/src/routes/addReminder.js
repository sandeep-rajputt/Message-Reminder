import express from "express";
const router = express.Router();
import authenticateToken from "../utils/authenticateToken.js";
import UserData from "../models/userData.model.js";
import Reminder from "../models/reminder.model.js";
import {
  scheduleTask,
  scheduleDailyTask,
  scheduleWeeklyTask,
  scheduleMonthlyTask,
} from "../utils/scheduleTask.js";
import checkDate from "../utils/checkDate.js";
import client from "../messaging/client.js";
import reactUniqueIds from "react-unique-ids";

router.post("/", authenticateToken, async (req, res) => {
  const {
    msgType,
    message,
    hour,
    minute,
    amPm,
    dayOfMonth,
    month,
    dayOfWeek,
    year,
  } = req.body;
  let { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: true, message: "number is required" });
  }
  if (!msgType) {
    return res
      .status(400)
      .json({ error: true, message: "msgType is required" });
  }
  if (!message) {
    return res
      .status(400)
      .json({ error: true, message: "message is required" });
  }
  if (!hour) {
    return res.status(400).json({ error: true, message: "hour is required" });
  }
  if (!minute) {
    return res.status(400).json({ error: true, message: "minute is required" });
  }
  if (!amPm) {
    return res.status(400).json({ error: true, message: "amPm is required" });
  }
  if (msgType === "setMsg" && (!dayOfMonth || !month)) {
    return res
      .status(400)
      .json({ error: true, message: "dayOfMonth and month are required" });
  }
  if (msgType === "weekly" && !dayOfWeek) {
    return res
      .status(400)
      .json({ error: true, message: "dayOfWeek is required" });
  }
  if (msgType === "monthly" && !dayOfMonth) {
    return res
      .status(400)
      .json({ error: true, message: "dayOfMonth is required" });
  }

  try {
    const user = await UserData.findOne({ number: req.user.number });
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    if (user.premium === false && user.messages.length > 4) {
      return res.status(400).json({
        error: true,
        message: "You can set up to 5 reminders only!",
      });
    }

    if (msgType === "setMsg") {
      const styleDate = `${dayOfMonth}/${month}/${year} ${hour}:${minute}${amPm}`;
      checkDate("setmsg", styleDate);
      const jobId = reactUniqueIds({
        length: 5,
        uppercase: true,
        lowercase: true,
        symbol: false,
        number: true,
      });
      scheduleTask(
        user._id,
        jobId,
        minute,
        hour,
        amPm,
        dayOfMonth,
        month,
        message,
        client,
        number
      );
      const newReminder = new Reminder({
        number: number,
        message: message,
        userId: user._id,
        time: {
          year: year,
          month: month,
          day: dayOfMonth,
          hour: hour,
          minute: minute,
          amPm: amPm,
        },
        jobId: jobId,
        msgType: "setMsg",
      });
      await newReminder.save();
      user.messages.push({
        jobId: jobId,
        message: message,
        date: `${dayOfMonth}/${month}/${year} ${hour}:${minute}${amPm}`,
      });
      await user.save();
      res.status(200).json({ error: false, message: "Reminder added" });
    } else if (msgType === "daily") {
      checkDate("setdaily", `${hour}:${minute}${amPm}`);
      const jobId = reactUniqueIds({
        length: 5,
        uppercase: true,
        lowercase: true,
        symbol: false,
        number: true,
      });
      scheduleDailyTask(jobId, minute, hour, amPm, message, client, number);
      const newReminder = new Reminder({
        number: number,
        message: message,
        userId: user._id,
        time: {
          hour: hour,
          minute: minute,
          amPm: amPm,
        },
        jobId: jobId,
        msgType: "daily",
      });
      await newReminder.save();
      user.messages.push({
        jobId: jobId,
        message: message,
        date: `${hour}:${minute}${amPm}`,
      });
      await user.save();
      res.status(200).json({ error: false, message: "Reminder added" });
    } else if (msgType === "weekly") {
      checkDate("setweekly", `${hour}:${minute}${amPm} ${dayOfWeek}`);
      const jobId = reactUniqueIds({
        length: 5,
        uppercase: true,
        lowercase: true,
        symbol: false,
        number: true,
      });
      scheduleWeeklyTask(
        jobId,
        minute,
        hour,
        amPm,
        dayOfWeek,
        message,
        client,
        number
      );
      const newReminder = new Reminder({
        number: number,
        message: message,
        userId: user._id,
        time: {
          hour: hour,
          minute: minute,
          amPm: amPm,
          dayOfWeek: dayOfWeek,
        },
        jobId: jobId,
        msgType: "weekly",
      });
      await newReminder.save();
      user.messages.push({
        jobId: jobId,
        message: message,
        date: `${hour}:${minute}${amPm} ${dayOfWeek}`,
      });
      await user.save();
      res.status(200).json({ error: false, message: "Reminder added" });
    } else if (msgType === "monthly") {
      checkDate("setmonthly", `${hour}:${minute}${amPm} ${dayOfMonth}`);
      const jobId = reactUniqueIds({
        length: 5,
        uppercase: true,
        lowercase: true,
        symbol: false,
        number: true,
      });
      scheduleMonthlyTask(
        jobId,
        minute,
        hour,
        amPm,
        dayOfMonth,
        message,
        client,
        number
      );
      const newReminder = new Reminder({
        number: number,
        message: message,
        userId: user._id,
        time: {
          hour: hour,
          minute: minute,
          amPm: amPm,
          dayOfMonth: dayOfMonth,
        },
        jobId: jobId,
        msgType: "monthly",
      });
      await newReminder.save();
      user.messages.push({
        jobId: jobId,
        message: message,
        date: `${hour}:${minute}${amPm} ${dayOfMonth}`,
      });
      await user.save();
      res.status(200).json({ error: false, message: "Reminder added" });
    } else {
      return res.status(400).json({ error: true, message: "Invalid msgType" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;
