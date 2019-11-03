const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/faq', (req, res) => {
	res.render('faq/index.ejs')
})

module.exports = router;