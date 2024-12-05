
// Imports -----------------------------------------------------------------------------------------

// import dependencies
const expressJs = require('express');
const pgPromise = require('pg-promise');
const handlebars = require('express-handlebars');
const session = require('express-session');
const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

// register handlebars helpers
require('./modules/handlebars_helpers')(Handlebars)

// Server Initialization ---------------------------------------------------------------------------

// create expressjs app handle
/** @type {expressJs.Express} */
const app = expressJs();

// connect the database and store a handle to it
/** @type {pgPromise.IDatabase} */
const database = pgPromise()({
	host: process.env.HOST || 'db',
	port: 5432,
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
});
app.database = database

// we can use an environment variable to check whether or not we want to 
// reinitialize the database from the database initialization scripts
if (process.env.REINITIALIZE_DB == "yes") {
	console.log("REINITIALIZE_DB is set to 'yes', re-running db initialization..")
	const dbInitDir = path.join(__dirname, "InitData");
	fs.readdirSync(dbInitDir).forEach((filename) => {
		const filepath = path.join(dbInitDir, filename)
		let  dbScript = fs.readFileSync(filepath, 'utf8');
		console.log("execute init script: " + filename)
		database.any(dbScript);
	})
}

// parse json in request body / forms
app.use(expressJs.json())
app.use(expressJs.urlencoded({extended: true}));

// From Lab 8
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

// Register hbs as our view engine using its bound engine() function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// tell the app to use session storage in HTTP requests
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
)

// Routes ------------------------------------------------------------------------------------------
// NOTE:
// To add new routes, add a new file .js to the ./routes directory, and implement the routes
// in that new file. Any routes specified in a file in that directory will be automatically
// picked by the code below. This will help reduce merge conflicts as it reduces the need to modify
// this index.js file so frequently, allowing multiple of us to implement different routes
// simultaneously without having to worry about messing up the git vcs tree.
// You can use the 'get.js' file as a template for adding new routes.


const routesDir = path.join(__dirname, "routes");
console.log("Looking for routes in " + routesDir + "...")

// load all js files in ./routes/
fs.readdirSync(routesDir).forEach((filename) => {
	if (filename.endsWith('.js')){

		// load the exported router object
		const route_module = require(path.join(routesDir, filename));

		// check to ensure the route is valid
		if (typeof(route_module) !== 'function'){
			console.warn("invalid module export from " + filename)
			return;
		}

		// listen for route api calls at specified path
		route_module(app)
		console.log("executed module from " + filename)
	}
});

// Start Server ------------------------------------------------------------------------------------

// start the server and keep open to listen to requests
const port = 3000
module.exports = app.listen(port);
console.log("Server is listening on port " + port)