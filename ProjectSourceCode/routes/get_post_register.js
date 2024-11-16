const bcrypt = require('bcryptjs');

/**
 * entry point for the route module, this function is immediately called when
 * the file is loaded by index.js
 * @typedef {import('express').Express} ExpressJs
 * @typedef {import('pg-promise').IDatabase} IDatabase
 * @param {ExpressJs} app 
 */
function main(app){

    // get handle to database from app
    /** @type {IDatabase} */
    const database = app.database

	// display register page
	app.get('/register', (req, res) => {
		res.render('pages/register');
	});

	// process register request
	app.post('/register', async (req, res) => {
		
		// create object to store user data
		const user = {
			username: req.body.username,
			password: req.body.password
		}
		console.log("attempting register new user '" + user.username + "'")

		// hash the password
		await bcrypt.hash(user.password, 10)
			.then(pass_hashed => {
				user.password = pass_hashed
			})
			.catch(err => {
				res.status(400)
				throw err
			})
		
		// ensure the user does not already exist
		let user_exists = false
		await database.none("SELECT username FROM users WHERE username = $1", [user.username])
			.catch(err => {
				res.status(400)
				console.warn(err)
				user_exists = true
			})
		if(user_exists){
			console.warn("User '" + user.username + "' already exists - abort registration")
			return
		}

		// insert new user entry
		const query = (
			"INSERT INTO users (username, password, description, image_url)" +
			"VALUES ($1, $2, 'empty', '')" +
			"ON CONFLICT (username) DO NOTHING;"
		)
		await database.none(query, [user.username, user.password])
			.then(() => {
				res.status(200)
				console.log("registered new user '" + user.username + "'")
			})
			.catch(err => {
				res.status(400)
				throw err
			})
	});
}

// export the specified entry point
module.exports = main;