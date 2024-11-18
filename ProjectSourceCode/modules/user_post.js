/**
 * @typedef {import('pg-promise').IDatabase} IDatabase
 */

/** @enum {number} */
const JOB_MODALITY = Object.freeze({
	IN_PERSON: 0,
	REMOTE: 1,
	HYBRID: 2,
	OTHER: 3,

	/**
	 * @returns {string}
	 * @param {this.JOB_MODALITY} mode 
	 */
	toString: function(mode) {
		switch(mode){
			case 0: return "In Person";
			case 1: return "Remote";
			case 2: return "Hybrid";
		}
		return "Other"
	}
})

/**
 * data structure that represents data pertaining to a user posting
 */
class UserPost{

	/** @type {number} post_id The unique post id for this post */ 
	post_id
	/** @type {string} username the user who created the post */ 
	username
	/** @type {string} company_name the name of the company the job post was for */ 
	company_name
	/** @type {string} position the title of the job position */ 
	position
	/** @type {string} link a link to the job posting */ 
	link
	/** @type {string} body a decsription from the user */ 
	body
	/** @type {number} modality */ 
	modality
	/** @type {number} salary the salary of the job */ 
	salary
	/** @type {number} upvotes  */ 
	upvotes
	/** @type {number} downvotes  */ 
	downvotes
	/** @type {Date} */
	time_posted

	constructor(){
		this.post_id = null
		this.username = ""
		this.company_name = ""
		this.position = ""
		this.link = ""
		this.modality = JOB_MODALITY.IN_PERSON
		this.body = ""
		this.salary = 0
		this.upvotes = 0
		this.downvotes = 0
	}

	/**
	 * @returns {UserPost}
	 * @param {string} owner the username of the user that created the post
	 */
	static Create(owner){
		var m = new UserPost()
		m.username = owner
		return m
	}

	/**
	 * create a UserPost object from any JSON data object, so that you can use 
	 * the member methods
	 * @param {any} json 
	 * @returns {UserPost}
	 */
	static FromJson(json){
		var m = new UserPost()
		for(let key in m){
			if(json[key]){
				m[key] = json[key]
			}
		}
		return m
	}

	/**
	 * fetch all posts with authored by the given user
	 * @returns {Array<UserPost>}
	 * @param {IDatabase} database
	 * @param {string} username 
	 */
	static async FetchPostsByUser(database, username){
		const m = []

		// query for all posts created by the given user and store them in the return array
		const query = "SELECT * FROM posts WHERE username=$1";
		await database.any(query, [username])
			.then((data) => {
				for(post of data) {
					m.push(UserPost.FromJson(post))
				}
			})
		return m
	}

	/**
	 * delete the post with the given post ID, returns true if successful otherwise false
	 * @returns {boolean}
	 * @param {IDatabase} database 
	 * @param {number} post_id 
	 */
	static async DeletePost(database, post_id){
		throw "not implemented"
	}

	/**
	 * stores an item in the database if possible, otherwise returns false
	 * @returns {boolean}
	 * @param {IDatabase} database 
	 */
	async storeInDB(database){

		// if we have a valid post id, check to see if it already exists in database
		if(this.post_id != null) {
			exists_in_db = false
			const check_query = "SELECT 1 FROM posts WHERE id=$1"
			await database.none(check_query, [this.id])
				.then()
				.catch(() => {
					exists_in_db = true
				})

			// if the post already exists, we don't want to store it
			if(exists_in_db) {
				console.error("user post already exists in database: " + this.post_id)
				return false
			}
		}

		// store the data from the UserPost object into the database
		const store_query = (
			"INSERT INTO posts (username, company_name, position, link, modality, body, salary)" +
			"VALUES ($1, $2, $3, $4, $5, $6, $7)" +
			"RETURNING post_id"
		)
		let stored = false
		await database.one(
			store_query, [
				this.username, this.company_name, 
				this.position, this.link, this.modality, 
				this.body, this.salary
			])
			.then((data) => {
				this.post_id = data.post_id // update the post id to reflect the newly stored row
				console.log("successfully stored into database", data)
				stored = true
			})
			.catch((err) => {
				console.warn(err)
			})
			
		return stored
	}

	async deleteFromDB(database){
		UserPost.DeletePost(database, this.post_id)
	}
}

// export things that we want to be able to access in other files
module.exports = {
	UserPost,
	JOB_MODALITY
}