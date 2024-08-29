async function handleUpgrade(message) {
  const chat = await message.getChat();
  await chat.sendMessage(
    `*Upgrade to Premium:*\n\nFor more features, please visit our website: https://message-reminder.sandeeprajput.in/premium\n`
  );
}

export default handleUpgrade;
