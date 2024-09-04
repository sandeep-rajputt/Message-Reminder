import express from "express";
const router = express.Router();
import authenticateToken from "../utils/authenticateToken.js";
import client from "../messaging/client.js";
import Reminder from "../models/reminder.model.js";
import { deleteTask } from "../utils/scheduleTask.js";

router.delete("/", authenticateToken, async (req, res) => {
  const { jobId } = req.body;

  try {
    const job = await Reminder.findOne({ jobId });
    if (!job) {
      res.status(404).json({ error: true, message: "Reminder not found" });
      return;
    } else {
      await deleteTask(job.userId, job.jobId, job.number, client, true);
      res.status(200).json({ error: false, message: "Reminder deleted" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
