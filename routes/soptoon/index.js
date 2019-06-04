var express = require('express');
var router = express.Router();

router.use('/main', require('./main'));
router.use('/banner', require('./banner'));
router.use('/ep', require('./ep'));
router.use('/comments', require('./comment'))
router.use('/like', require('./like'))

module.exports = router;