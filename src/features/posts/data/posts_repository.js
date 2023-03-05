const axios = require("axios").default;

class PostsRepository {
	async getPosts() {
		const res = await axios.get(`${process.env.JSON_PLACEHOLDER_URL}/posts`);
		return res.data;
	}
}

module.exports = PostsRepository;
