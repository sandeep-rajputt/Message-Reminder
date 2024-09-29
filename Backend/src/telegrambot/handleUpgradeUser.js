import UserData from "../models/userData.model.js";

async function handleUpgradeUser(ctx, bot, adminTelegramId) {
  const message = ctx.message.text;
  const userId = ctx.message.from.id;
  const userMessage = message.split(" ").slice(1).join(" ");
  if (!userMessage) {
    ctx.reply("Please provide a user email to upgrade.");
    return;
  }
  try {
    const user = await UserData.findOne({ email: userMessage });
    if (!user) {
      ctx.reply("User not found.");
      return;
    } else if (user.premium === true) {
      ctx.reply("User already upgraded to premium.");
      return;
    }
    user.premium = true;
    await user.save();
    ctx.reply("User upgraded to premium. 🎉🎉");
  } catch (error) {
    ctx.reply("Error upgrading user. Please try again.");
  }
}

export default handleUpgradeUser;
