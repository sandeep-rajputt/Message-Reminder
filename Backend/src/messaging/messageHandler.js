import client from "./client.js";

client.on("message", (message) => {
  console.log(message.body);
});
