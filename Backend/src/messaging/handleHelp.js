async function handleHelp(message, client) {
  const chat = await message.getChat();
  await chat.sendMessage(`
  *Commands:*\n
  1. */setmsg DD/MM/YYYY HH:MMAM/PM "message"* - Set a reminder for a specific date and time.\n
  2. */setdaily HH:MMAM/PM "message"* - Set a daily reminder at a specific time.\n
  3. */setweekly HH:MMAM/PM Day "message"* - Set a weekly reminder at a specific time on a specific day.\n
  4. */list* - List all your reminders.\n
  5. */delete id* - Delete a reminder by its id.\n
  6. */deleteall* - Delete all reminders.\n
  7. */help* - Show this help message.\n
  8. */upgrade* - Upgrade to premium for more features.\n
  `);
}

export default handleHelp;
