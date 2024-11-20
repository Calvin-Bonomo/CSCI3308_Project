// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// display homepage when connecting to website root
router.get('/logout', (req, res) => {
	res.render('pages/logout');
})

// export the specified routes in this file
module.exports = router;