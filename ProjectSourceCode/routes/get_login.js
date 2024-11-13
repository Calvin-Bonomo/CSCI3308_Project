// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// render login page
router.get('/login', (req, res) => {
	res.render('pages/login')
})

// export the specified routes in this file
module.exports = router;