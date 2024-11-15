// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// render myApplications page
router.get('/my_applications', (req, res) => {
    res.render('pages/myApplications');
})

// export the specified routes in this file
module.exports = router;

