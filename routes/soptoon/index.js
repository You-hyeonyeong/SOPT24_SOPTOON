var express = require('express');
var router = express.Router();

router.use('/main', require('./main'));
<<<<<<< HEAD
router.use('/banner', require('./banner'));
router.use('/ep', require('./ep'));
=======
router.use('/comments', require('./comment'))
>>>>>>> aa20c1dadae08d7ec26c17afd0305947d226bbd1

module.exports = router;