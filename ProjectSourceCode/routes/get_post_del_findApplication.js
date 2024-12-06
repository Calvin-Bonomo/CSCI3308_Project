const UserPost = require('../modules/user_post');
const { PageContext } = require('../modules/page_context');

/**
 * entry point for the route module, this function is immediately called when
 * the file is loaded by index.js
 * @typedef {import('express').Express} ExpressJs
 * @typedef {import('pg-promise').IDatabase} IDatabase
 * @param {ExpressJs} app 
 */
function main(app) {

	// get handle to database from app
	/** @type {IDatabase} */
	const database = app.database;
	const page = 1;
	const page_size = 10;

	// load the page used to create a new application
	app.get("/find_applications/create", (req, res) => {

		// ensure user is logged in
		if (!req.session.user) {
			console.warn("attempt to access post creation while not logged in, redirecting..")
			res.status(400).redirect('/')
			return
		}

		// display page
		res.render('pages/findApplications_create', PageContext.Create(app, req))
	})

	app.post("/find_applications/create", (req, res) => {
		
		// ensure user is logged in
		if (!req.session.user) {
			console.warn("abort attempt to post while not logged in")
			res.status(400).end()
			return
		}

		console.log(req.body)
	})
}

// export the specified entry point
module.exports = main;