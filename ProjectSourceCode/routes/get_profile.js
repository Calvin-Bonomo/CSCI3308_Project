// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// display login page
router.get('/profile', (req, res) => {
	res.render('pages/profile');
})

// export the specified routes in this file
module.exports = router;