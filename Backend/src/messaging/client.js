import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.on("qr", (qr) => {
  console.log("ready for qrcode");
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above to log in.");
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();
console.log("client initialized");

// handle errors if disconnect
client.on("disconnected", (reason) => {
  console.log("Client was logged out due to", reason);
  client.destroy().then(() => client.initialize());
});

client.on("auth_failure", (msg) => {
  console.error("Authentication failure:", msg);
  client.destroy().then(() => client.initialize());
});

client.on("error", (error) => {
  console.error("Error occurred:", error);
  if (error.message.includes("Execution context was destroyed")) {
    console.log("Reinitializing client due to context destruction...");
    client.destroy().then(() => client.initialize());
  }
});

export default client;
