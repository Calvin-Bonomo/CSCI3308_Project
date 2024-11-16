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
		res.render('pages/logout');
	})
}

// export the specified entry point
module.exports = main;
