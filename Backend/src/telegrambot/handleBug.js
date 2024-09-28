async function handleBug(ctx, bot, adminTelegramId) {
  const message = ctx.message.text;
  const userId = ctx.message.from.id;
  const userMessage = message.split(" ").slice(1).join(" ");
  if (!userMessage) {
    ctx.reply(
      "Please submit a bug report using the following format: \n\n/bug YOUR_MESSAGE"
    );
    return;
  }
  ctx.reply("Thank you for reporting the bug. We will look into it.");
  bot.telegram.sendMessage(
    adminTelegramId,
    `Bug report from ${userId}\nName: ${ctx.message.from.first_name} ${ctx.message.from.last_name}\nNumber: ${ctx.message.from.phone_number}\nUsername: ${ctx.message.from.username}\n\nmessage : ${userMessage}`
  );
}

export default handleBug;
