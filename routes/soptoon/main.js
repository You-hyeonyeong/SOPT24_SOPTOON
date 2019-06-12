var express = require('express');
var router = express.Router();

const upload = require('../../config/multer');
const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');
const moment = require('moment');

/*
    METHOD  : GET
    url     : /webtoon/main/:flag
    메인 웹툰 가져오기
*/
router.get('/:flag', async(req, res) => {
    const flag = req.params.flag;

    if(flag == 0) {
        const getMain0Query = 'SELECT * FROM webtoon ORDER BY webtoonLike DESC'; //인기
        const getMain0Result = await db.queryParam_None(getMain0Query);
        if(!getMain0Result) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MAIN_DB_SELECT_ERROR));
        } else {
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.MAIN0_SUCCESS, getMain0Result));
            console.log(getMain0Result);
        }
    } else if (flag == 1){
        const getMain1Query = 'SELECT * FROM webtoon ORDER BY webtoonDate DESC'; //신작
        const getMain1Result = await db.queryParam_None(getMain1Query);
        if(!getMain1Result) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MAIN_DB_SELECT_ERROR));
        } else {
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.MAIN1_SUCCESS, getMain1Result));
            console.log(getMain1Result);
        }
    } else if (flag == 2) {
         const getMain2Query = 'SELECT * FROM webtoon WHERE webtoonCom = 1'; //완결
         const getMain2Result = await db.queryParam_None(getMain2Query);
         if(!getMain2Result) {
            res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MAIN_DB_SELECT_ERROR));
        } else {
            res.status(200).send(utils.stiuccessTrue(statusCode.OK, resMessage.MAIN2_SUCCESS, getMain2Result));
            console.log(getMain2Result);
        }
    } else {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.WRITE_FLAG_VALUE));
    } 
});

//웹툰 등록
router.post('/', upload.single("thumbnail"), async (req, res) => {
    let reqBodyJson = req.body;
    const userQuery = `SELECT userId FROM user WHERE userIdx = ${reqBodyJson.userIdx}`;
    const userNameDb = await db.queryParam_None(userQuery);

    let webtoonData = {
        webtoonTitle : reqBodyJson.title,
        webtoonArtist : userNameDb[0]['userId'],
        webtoonThumbnail : req.file.location,
        webtoonDate : moment().format("YYYY-MM-DD"),
    }

    if(webtoonData.webtoonTitle && webtoonData.webtoonArtist && webtoonData.webtoonThumbnail) {
        const enrollWebtoonQuery = 'INSERT INTO webtoon(webtoonTitle, webtoonArtist, webtoonThumnail,webtoonDate) VALUES (?,?,?,?)';
        const enrollWebtoon = await db.queryParam_Arr(enrollWebtoonQuery,
            [webtoonData.webtoonTitle, webtoonData.webtoonArtist, webtoonData.webtoonThumbnail, webtoonData.webtoonDate]);  
        if(enrollWebtoon){
            res.status(203).send(utils.successTrue(statusCode.CREATED, resMessage.MAIN_ENROLL_SUCCESS,webtoonData));
        } else {
            res.status(404).send(utils.successFalse(statusCode.NOT_FOUND, resMessage.MAIN_ENROLL_FAIL));
        }
    } else {
        res.status(403).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.ENROLL_COMMENT_SUCCESS));
    }
    
})

module.exports = router;