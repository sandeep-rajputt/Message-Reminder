import UserData from "../models/userData.model.js";

async function handleUpgradeUser(message) {
  const chat = await message.getChat();
  const upgradeUser = `${message.body.split(" ")[1]}@c.us`;
  const user = await UserData.findOne({ number: upgradeUser });
  if (!user) {
    chat.sendMessage("User not found.");
    return;
  } else if (user.premium === true) {
    chat.sendMessage("User already upgraded to premium.");
    return;
  }
  user.premium = true;
  await user.save();
  chat.sendMessage("User upgraded to premium. 🎉🎉");
  return;
}

export default handleUpgradeUser;
