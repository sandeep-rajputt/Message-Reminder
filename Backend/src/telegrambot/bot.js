import { Telegraf } from "telegraf";
import handleBug from "./handleBug.js";
import handleUpgradeUser from "./handleUpgradeUser.js";
import dotenv from "dotenv";
dotenv.config();

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const adminTelegramId = parseInt(process.env.ADMIN_TELEGRAM_ID);

const bot = new Telegraf(botToken);

bot.on("message", (ctx) => {
  const message = ctx.message.text;
  const chatId = ctx.message.chat.id;
  if (message.startsWith("/start")) {
    bot.telegram.sendMessage(chatId, "Welcome to the bot!");
  } else if (message.startsWith("/bug")) {
    handleBug(ctx, bot, adminTelegramId);
  } else if (message.startsWith("/upgradeuser")) {
    console.log(ctx.message.from.id);
    console.log(adminTelegramId);
    if (ctx.message.from.id === adminTelegramId) {
      handleUpgradeUser(ctx, bot, adminTelegramId);
    } else {
      ctx.reply("You are not authorized to use this command.");
    }
  }
});

bot.launch();

export default bot;
