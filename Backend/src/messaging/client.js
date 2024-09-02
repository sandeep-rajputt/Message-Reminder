import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";
import handleSetMsg from "./handleSetMsg.js";
import UserData from "../models/userData.model.js";
import createUser from "../utils/createUser.js";
import reactUniqueIds from "react-unique-ids";
import bcrypt from "bcrypt";
import reScheduleTask from "../utils/reScheduleTask.js";
import handleList from "./handleList.js";
import handleDelete from "./handleDelete.js";
import handleSetDaily from "./handleSetDaily.js";
import handleSetWeekly from "./handleSetWeekly.js";
import handleDeleteAll from "./handleDeleteAll.js";
import handleHelp from "./handleHelp.js";
import handleUpgrade from "./handleUpgrade.js";
import handleMonthly from "./handleMonthly.js";
import handleUpgradeUser from "./handleUpgradeUser.js";
import handleBug from "./handleBug.js";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

// Generate QR code for authentication
client.on("qr", (qr) => {
  console.log("ready for qrcode");
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above to log in.");
});

// Handle client readiness
client.on("ready", () => {
  console.log("Client is ready!");
  reScheduleTask(client);
});

// Handle incoming messages
client.on("message", async (message) => {
  console.log(message.body);
  if (message.from.endsWith("c.us")) {
    const chat = await message.getChat();
    const user = await UserData.findOne({ number: message.from });
    if (!user) {
      const password = reactUniqueIds();
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserData = {
        number: message.from,
        password: hashedPassword.toString(),
      };
      const createdUser = await createUser(newUserData);
      if (!createdUser) {
        chat.sendMessage("Error creating user");
        return;
      }
    }
    if (message.body.startsWith("/upgradeuser")) {
      if (message.from.includes(process.env.ADMIN_NUMBER)) {
        await handleUpgradeUser(message, client);
      } else {
        chat.sendMessage("You are not authorized to use this command.");
      }
    } else if (message.body.startsWith("/setmsg")) {
      await handleSetMsg(message, client);
    } else if (message.body.startsWith("/list")) {
      await handleList(message);
    } else if (message.body.startsWith("/deleteall")) {
      await handleDeleteAll(message, client);
    } else if (message.body.startsWith("/delete")) {
      await handleDelete(message, client);
    } else if (message.body.startsWith("/setdaily")) {
      await handleSetDaily(message, client);
    } else if (message.body.startsWith("/setweekly")) {
      await handleSetWeekly(message, client);
    } else if (message.body.startsWith("/help")) {
      await handleHelp(message, client);
    } else if (message.body.startsWith("/upgrade")) {
      await handleUpgrade(message);
    } else if (message.body.startsWith("/setmonthly")) {
      await handleMonthly(message, client);
    } else if (message.body.startsWith("/bug")) {
      await handleBug(message, client);
    }
  }
});

// Initialize the client
const retry = (attempts = 0) => {
  const delay = Math.min(1000 * 2 ** attempts, 30000);
  setTimeout(() => {
    client.initialize().catch((error) => {
      console.error("Reconnection failed:", error);
      retry(attempts + 1);
    });
  }, delay);
};

client.initialize();
console.log("client initialized");

// Handle errors and reconnect with backoff strategy
client.on("disconnected", (reason) => {
  console.log("Client was logged out due to", reason);
  client.destroy().then(() => retry());
});

client.on("auth_failure", (msg) => {
  console.error("Authentication failure:", msg);
  client.destroy().then(() => retry());
});

client.on("error", (error) => {
  console.error("Error occurred:", error);
  if (error.message.includes("Execution context was destroyed")) {
    console.log("Reinitializing client due to context destruction...");
    client.destroy().then(() => retry());
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await client.destroy();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await client.destroy();
  process.exit(0);
});

export default client;
