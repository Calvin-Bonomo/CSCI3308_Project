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
		res.render('pages/login')
	})

	app.post('/login', async (req, res) => {
	    // check if password from request matches with password in DB
	    const select_query=`SELECT *
	                        FROM users
	                        WHERE username = $1;`;
	    await database.one(select_query, [req.body.username]).then(data=> {
	        user.username = data.username;
	        user.password = data.password;
	    });
	    const match = await bcrypt.compare(await bcrypt.hash(req.body.password, 10), user.password);
	    if (!match) {
	        res.render('pages/login');
	    } 
	    else {
	        //save user details in session like in lab 7
	        req.session.user = user;
	        req.session.save();
	    }
	});
}

// export the specified entry point
module.exports = main;
