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

    // render findApplications page
    app.get('/find_applications', (req, res) => {
        res.render('pages/findApplications');
    })
}

// export the specified entry point
module.exports = main;