async function handleHelp(message, client) {
  const chat = await message.getChat();
  await chat.sendMessage(`
  *Commands:*\n
  1. */setmsg DD/MM/YYYY HH:MMAM/PM "message"* - Set a reminder for a specific date and time.\n
  2. */setdaily HH:MMAM/PM "message"* - Set a daily reminder at a specific time.\n
  3. */setweekly HH:MMAM/PM Day "message"* - Set a weekly reminder at a specific time on a specific day.\n
  4. */setmonthly HH:MMAM Date "message"* - Set a monthly reminder at a specific time on a specific day.\n
  5. */list* - List all your reminders.\n
  6. */delete id* - Delete a reminder by its id.\n
  7. */deleteall* - Delete all reminders.\n
  8. */help* - Show this help message.\n
  9. */upgrade* - Upgrade to premium for more features.\n

  *Note:*\n
  - Day should be one of the following: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.\n
  - Date should be a number between 1 and 31.\n
  - You can set up to 5 reminders for free. To increase your limit, please use the /upgrade option.
  `);
}

export default handleHelp;
