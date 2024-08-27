import UserData from "../models/userData.model.js";

async function handleList(message) {
  const chat = await message.getChat();
  const user = await UserData.findOne({ number: message.from });
  if (user.messages.length === 0) {
    chat.sendMessage("You have no reminders.");
    return;
  }
  let finalMessage = "Your reminders: \n\n\n";
  user.messages.forEach((message, index) => {
    finalMessage += `${index + 1}) ${message.message} at ${
      message.date
    }\n id: ${message.jobId}\n\n`;
  });
  chat.sendMessage(finalMessage);
}

export default handleList;
