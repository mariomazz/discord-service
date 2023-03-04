function isMyBot(id) {
	return id === process.env.BOT_ID;
}
module.exports = {
	isMyBot: isMyBot,
};
