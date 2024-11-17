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

	// display logout page when request that url
	app.get('/logout', (req, res) => {
		
		// ensure user is logged in
		if(!req.session.username) {
			console.warn("attempt to logout while not logged in, redirecting to login..")
			res.redirect('/login')
			return
		}

		// log out
		req.session.destroy();
		console.log("Logout Successful!")
		res.redirect('pages/home');
	})
}

// export the specified entry point
module.exports = main;
