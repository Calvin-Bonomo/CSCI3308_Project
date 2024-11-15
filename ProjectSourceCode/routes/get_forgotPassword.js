// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// display homepage when connecting to website root
router.get('/forgot_password', (req, res) => {
	res.render('pages/forgotPassword');
})

// export the specified routes in this file
module.exports = router;