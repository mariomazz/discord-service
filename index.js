const env = `env/${process.env.ENV || ""}.env`;
require("dotenv").config({ path: env });
console.log("START: " + env);
console.log("run : " + process.cwd());

const PostsService = require("./src/features/posts/application/posts_service");
const PostsRepository = require("./src/features/posts/data/posts_repository");
const imb = require("./src/common/utils/is_my_bot");
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

client.on("messageCreate", async (message) => {
	if (imb.isMyBot(message.author.id) == false) {
		message.react("❤️");
	}
	if (message.content === "deploy.now") {
		message.channel.send("deploy start ....");
	}

	if (message.content === "posts.fetch") {
		await message.reply("OK");
		const servicePosts = new PostsService(new PostsRepository());
		const posts = await servicePosts.getPosts();
		const listPosts = Array.from(posts);
		listPosts.forEach((e, index) => {
			setTimeout(() => {
				message.channel.send(`.`);
				message.channel.send(`ID: ${e.id}\nTITLE: ${e.title}\nBODY: ${e.body}`);
			}, 500);
		});
	}
});

client.login(process.env.BOT_TOKEN).then(() => {});
