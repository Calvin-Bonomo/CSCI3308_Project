// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// display homepage when connecting to website root
router.post('/find_applications', (req, res) => {
	res.status(200);
})

// export the specified routes in this file
module.exports = router;