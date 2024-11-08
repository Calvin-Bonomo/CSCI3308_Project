
// Imports -----------------------------------------------------------------------------------------

// import dependencies
const expressJs = require('express');
const pgPromise = require('pg-promise');

// Server Initialization ---------------------------------------------------------------------------

// create expressjs app handle
/** @type {expressJs.Express} */
const app = expressJs();

// connect the database and store a handle to it
/** @type {pgPromise.IMain} */
const database = pgPromise()({
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
});

// parse json in request body
app.use(expressJs.json())

// ??? not really sure but I think we need it
app.use(expressJs.urlencoded({extended: true}));

// Routes ------------------------------------------------------------------------------------------

// display hello world on connecto to homepage
app.get('/', (_, res) => {
	res.status(200).send("Hello, World!")
})


// display hello world on connecto to homepage
app.get('/welcome', (_, res) => {
	res.json({status: 'success', message: 'Welcome!'})
})

// Start Server ------------------------------------------------------------------------------------

// start the server and keep open to listen to requests
const port = 3000
module.exports = app.listen(port);
console.log("Server is listening on port " + port)