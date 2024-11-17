const bcrypt = require('bcryptjs');

/**
 * entry point for the route module, this function is immediately called when
 * the file is loaded by index.js
 * @typedef {import('express').Express} ExpressJs
 * @typedef {import('pg-promise').IDatabase} IDatabase
 * @param {ExpressJs} app the ExpressJs app instance is passed into our 
 * 		function from index.js
 */
function main(app){

    // get handle to database from app
    /** @type {IDatabase} */
    const database = app.database

	// Login ---------------------------------------------------------------------------------------

	// render login page
	app.get('/login', (req, res) => {
		
		// ensure user is not already logged in
		if(req.session.username) {
			console.warn("attempt to access login while logged in, redirecting..")
			res.redirect(400, '/landing')
			return
		}

		// display page
		res.render('pages/login')
	})

	app.post('/login', async (req, res) => {
		
		// ensure user is not already logged in
		if(req.session.username) {
			console.warn("abort attempt to login while logged in")
			res.status(400).end()
			return
		}

		// create user object to store info from database
		const user = {
			username: req.body.username,
			password: ""
		}
		console.log("attempting login for user - " + user.username)

		// fetch user data
		let user_found = false
		const select_query=`SELECT * FROM users WHERE username = $1;`;
	    await database.one(select_query, [user.username])
			.then(data => {
				user.username = data.username;
				user.password = data.password;
				user_found = true;
				console.log("found user in database - " + user.username)
	    	})
			.catch(err => {
				console.error(err)
				res.status(400).render('pages/login')
			})
		if(!user_found){
			console.warn("User not found - " + user.username)
			return
		}

		// check if password from request matches with password in DB
		console.log("hashing password input...")
	    const match = await bcrypt.compare(req.body.password, user.password)
		console.log("comparing hashes...")

	    if (!match) {
			res.status(400).render('pages/login');
			console.warn("Pasword hash mismatch!")
	    } 
	    else {
	        // save user details in session like in lab 7
	        req.session.user = user;
	        req.session.save();
			res.status(200).redirect("/landing")
			console.log("login succsessful!")
	    }
	});
}

// export the specified entry point
module.exports = main;
