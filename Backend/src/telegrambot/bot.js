import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const adminTelegramId = process.env.ADMIN_TELEGRAM_ID;

const bot = new Telegraf(botToken);

bot.on("message", (ctx) => {
  console.log("bot got a message");
  const message = ctx.message.text;
  const chatId = ctx.message.chat.id;
  if (message.startsWith("/start")) {
    bot.telegram.sendMessage(chatId, "Welcome to the bot!");
  }
});

bot.launch();

export default bot;
