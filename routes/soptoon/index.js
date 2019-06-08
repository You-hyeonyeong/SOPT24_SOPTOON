var express = require('express');
var router = express.Router();

router.use('/main', require('./main'));
router.use('/banner', require('./banner'));
router.use('/ep', require('./ep'));
router.use('/epcontent', require('./epcontent'));
router.use('/comments', require('./comment'))

module.exports = router;