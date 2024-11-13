
// Imports -----------------------------------------------------------------------------------------

// import dependencies
const expressJs = require('express');
const pgPromise = require('pg-promise');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');

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

// From Lab 8
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes ------------------------------------------------------------------------------------------

// display hello world on connecto to homepage
app.get('/', (req, res) => {
	res.render('pages/home');
})

// display hello world on connecto to homepage
app.get('/welcome', (_, res) => {
	res.json({status: 'success', message: 'Welcome!'});
})

// render login page
app.get('/login', (req, res) => {
	res.render('pages/login')
})

// Start Server ------------------------------------------------------------------------------------

// start the server and keep open to listen to requests
const port = 3000
module.exports = app.listen(port);
console.log("Server is listening on port " + port)