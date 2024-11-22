const { Application } = require('../modules/application');
const { PageContext } = require('../modules/page_context');
const handlebars = require('handlebars');

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
    const database = app.database;
    const page = 1;
    const page_size = 10;

    // Register handlebars helpers
    handlebars.registerHelper('formatDate', function(date) {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    });

    handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    // render myApplications page with applications data
    app.get('/my_applications', (req, res) => {
        Application.fetchAll(database, page_size, (page - 1) * page_size)
            .then(applications => {
                res.render('pages/myApplications', PageContext.Create(app, req, { applications }));
            })
            .catch(err => {
                console.error('Failed to render my applications:', err);
                res.status(400).send('An error occurred while fetching applications. Please try again later. Details: ' + err.message);
            });
    });
}

// export the specified entry point
module.exports = main;


