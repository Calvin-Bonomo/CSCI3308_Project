const { Application } = require('../modules/application');

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

    // save new comment on post
    app.post('/add_comment/:post_id', async (req, res) => {
        const post_id = req.params.post_id
        console.log('Add comment to post id ', post_id);

        database.none(
            "INSERT INTO comments (post_id, username, body)" +
            "values ($1, $2, $3);",
            [post_id, req.session.user.username, req.body.comment]
        )
            .then(() => {
                console.log('Add comment success!');
                res.status(200).redirect("/view_post/" + post_id);
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    });
}

// export the specified entry point
module.exports = main;

