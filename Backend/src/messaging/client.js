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

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.on("qr", (qr) => {
  console.log("ready for qrcode");
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above to log in.");
});

client.on("ready", () => {
  console.log("Client is ready!");
  reScheduleTask(client);
});

client.on("message", async (message) => {
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

    if (message.body.startsWith("/setmsg")) {
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
      await handleUpgrade(message, client);
    }
  }
});

client.initialize();
console.log("client initialized");

// handle errors if disconnect
client.on("disconnected", (reason) => {
  console.log("Client was logged out due to", reason);
  client.destroy().then(() => client.initialize());
});

client.on("auth_failure", (msg) => {
  console.error("Authentication failure:", msg);
  client.destroy().then(() => client.initialize());
});

client.on("error", (error) => {
  console.error("Error occurred:", error);
  if (error.message.includes("Execution context was destroyed")) {
    console.log("Reinitializing client due to context destruction...");
    client.destroy().then(() => client.initialize());
  }
});

export default client;
