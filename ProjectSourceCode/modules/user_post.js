/**
 * @typedef {import('pg-promise').IDatabase} IDatabase
 */

/** @enum {Number} */
const JOB_MODALITY = Object.freeze({
	IN_PERSON: 0,
	REMOTE: 1,
	HYBRID: 2,
	OTHER: 3,

	/**
	 * @returns {String}
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
 * Type that represents a user posting
 * @property {Number} post_id The unique post id for this post
 * @property {String} username the user who created the post
 * @property {String} company_name the name of the company the job post was for
 * @property {String} position the title of the job position
 * @property {String} link a link to the job posting
 * @property {String} body a decsription from the user
 * @property {Number} modality
 * @property {Number} salary the salary of the job
 * @property {Number} upvotes 
 * @property {Number} downvotes 
 */
class UserPost{
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
	 * stores an item in the database if possible, otherwise returns false
	 * @returns {Boolean}
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
}

// export things that we want to be able to access in other files
module.exports = {
	UserPost,
	JOB_MODALITY
}