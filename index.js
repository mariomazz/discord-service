require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", (interaction) => {});

client.on("messageCreate", (message) => {
	if (isMyBot(message.author.id) == false) {
		message.react("❤️");
	}
	if (message.content === "deploy.now") {
		message.channel.send("deploy start ....");
	}
});

client.login(process.env.BOT_TOKEN).then(() => {});

function isMyBot(id) {
	return id === process.env.OAUTH_CLIENT_ID;
}
