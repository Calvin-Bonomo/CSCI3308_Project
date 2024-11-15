// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// render findApplications page
router.get('/find_applications', (req, res) => {
    res.render('pages/findApplications');
})

// export the specified routes in this file
module.exports = router;