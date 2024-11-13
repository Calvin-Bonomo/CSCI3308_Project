// create object to export routes through
const expressJs = require('express');
const router = expressJs.Router();

// send json status and message on get /welcome
router.get('/welcome', (_, res) => {
	res.json({status: 'success', message: 'Welcome!'});
})

module.exports = router