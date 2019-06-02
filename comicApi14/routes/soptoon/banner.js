var express = require('express');
var router = express.Router();

const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');

/*
    METHOD  : GET
    url     : /webtoon/main/banner
    메인 배너 가져오기
*/
router.get('/banner', async(req, res) => {
    //배너 json형태로 보내주기

    
    let imgjson = [{
        "imgTitle": "banner_1",
        "imgUrl": "https://image-comic.pstatic.net/webtoon/557676/thumbnail/thumbnail_IMAG02_d49b96e6-d028-4813-85f4-e527e6058f20.jpg"
    },
    {
        "imgTitle": "banner_2",
        "imgUrl": "https://image-comic.pstatic.net/webtoon/626906/thumbnail/thumbnail_IMAG02_1cf242d9-52af-4160-af02-4445ad45e2d1.jpg"
    },
    {
        "imgTitle": "banner_3",
        "imgUrl": "https://image-comic.pstatic.net/webtoon/728900/thumbnail/thumbnail_IMAG02_7d6efcd1-8d65-4946-95e1-8c1a5c52afa8.jpg"
    }]
    
    res.status(200).send(utils.successTrue(statusCode.OK, resMessage.BANNER_SUCCESS));

});
module.exports = router;