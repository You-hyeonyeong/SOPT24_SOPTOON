var express = require('express');
var router = express.Router();

router.use('/main', require('./main'));
router.use('/comments', require('./comment'))

module.exports = router;