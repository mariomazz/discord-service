class PostsService {
	repo;
	constructor(repo) {
		this.repo = repo;
	}
	async getPosts() {
		return await this.repo.getPosts();
	}
}

module.exports = PostsService;
