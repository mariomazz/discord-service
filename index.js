const env = `env/${process.env.ENV || ""}.env`;
require("dotenv").config({ path: env });
console.log("START: " + env);
console.log("run : " + process.cwd());

const express = require("express");
const app = express();
const PostsService = require("./src/features/posts/application/posts_service");
const PostsRepository = require("./src/features/posts/data/posts_repository");
const imb = require("./src/common/utils/is_my_bot");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { tryParseInt } = require("./src/common/utils/try_parse_int");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildWebhooks,
	],
	partials: [Partials.Channel, Partials.Message],
});

client.once("ready", () => {
	console.log("Ready!");
});

client.on("interactionCreate", (interaction) => {});

client.on("messageCreate", async (message) => {
	if (imb.isMyBot(message.author.id) == false) {
		message.react("❤️");
		if (message.content.toLowerCase().startsWith("deploy.now")) {
			await message.reply("OK");
			await message.channel.send("deploy start ....");
		}
		if (message.content.toLowerCase().startsWith("posts.fetch")) {
			const splittedMessageContent = message.content.toLowerCase().split(".");
			const limitUserInput = tryParseInt(
				splittedMessageContent.at(splittedMessageContent.length - 1)
			);
			await message.reply("OK");
			Array.from(
				await new PostsService(new PostsRepository()).getPosts()
			).forEach((e, index) => {
				if (limitUserInput && index < limitUserInput) {
					setTimeout(() => {
						message.channel.send(`.`);
						message.channel.send(
							`ID: ${e.id}\nTITLE: ${e.title}\nBODY: ${e.body}`
						);
					}, 500);
				}
			});
		}
	}
});

client.on("messageDelete", async (message) => {
	await message.channel.send("Stop delete messages!");
});

client.login(process.env.BOT_TOKEN).then(() => {});

app.get("/", (req, res) => {
	res.send("Service enabled");
});

app.listen(process.env.HTTP_PORT, () => {
	console.log(`Example app listening on port ${process.env.HTTP_PORT}`);
});
