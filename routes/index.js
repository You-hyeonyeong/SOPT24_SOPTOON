var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/soptoon', require('./soptoon'));

module.exports = router;