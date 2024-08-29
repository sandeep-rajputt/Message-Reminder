async function handleBug(message, client) {
  const chat = await message.getChat();
  const userMessage = message.body.split(" ").slice(1).join(" ");
  if (!userMessage) {
    chat.sendMessage("Please provide a bug report.");
    return;
  }
  chat.sendMessage("Thank you for reporting the bug. We will look into it.");
  // Send the bug report to the admin
  const adminNumber = process.env.ADMIN_NUMBER;
  // ADMIN_NUMBER = 917494859460
  await client.sendMessage(
    `${adminNumber}@c.us`,
    `Bug report from ${message.from}\n\nmessage : ${userMessage}`
  );
}

export default handleBug;
