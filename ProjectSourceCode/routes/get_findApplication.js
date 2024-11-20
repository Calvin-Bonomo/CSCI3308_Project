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
    let page = 1;
    const page_size = 10;

    // render findApplications page
    app.get('/find_applications', (req, res) => {
      const query = "select * from posts order by time_posted desc limit $1 offset $2;";

      database.any(query, [page_size, page]).then(data => {
        res.render('pages/findApplications').json({
          posts: data,
        });
      }).catch(err => {
          console.warn("failed to select from posts");
          res.render('pages/findApplications');
      });

    })
}

// export the specified entry point
module.exports = main;