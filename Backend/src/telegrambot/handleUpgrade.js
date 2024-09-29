async function handleUpgrade(ctx) {
  try {
    await ctx.reply(
      "For more features, please visit our website: https://message-reminder.sandeeprajput.in/premium"
    );
  } catch (error) {
    console.error("Error upgrading:", error);
  }
}

export default handleUpgrade;
