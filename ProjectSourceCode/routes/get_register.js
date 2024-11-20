// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// display register page
router.get('/register', (req, res) => {
	res.render('pages/register');
})

// export the specified routes in this file
module.exports = router;