var express = require('express');
var router = express.Router();

const utils = require('../../../utils/utils');
const resMessage = require('../../../utils/responseMessage');
const statusCode = require('../../../utils/statusCode');
const db = require('../../../module/pool');


//request body
//webtoonIdx : 웹툰 고유번호
//userIdx : 유저 고유번호
//
router.post('/', async (req, res) => {
    //좋아요 상태 요청
    const getLikeQuery = `SELECT * FROM webtoonIdx WHERE webtoonIdx = ${req.body.webtoonIdx} AND userIdx = ${req.body.userIdx}`
    const getLikeDb = await db.queryParam_None(getLikeQuery);
    console.log(getLikeDb);

    //좋아요 상태 변경
    if (!getLikeDb) {   
        const enrollLikeQuery = `INSERT INTO webtoonIdx (webtoonIdx, userIdx, likeOnOff) VALUES (${req.body.webtoonIdx}, ${req.body.userIdx}, 1)`
        await db.queryParam_None(enrollLikeQuery);
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.CHANGE_LIKE_ON));
    }   
    else {
        if (getLikeQuery[0]['likeOnOff'] == 0) {
            const updateLikeQuery = `UPDATE webtoonIdx SET (likeIdx, webtoonIdx, userIdx, likeOnOff) VALUES (${getLikeQuery[0]['likeOnOff']}, ${req.body.webtoonIdx}, ${req.body.userIdx}, 1)`
            await db.queryParam_None(updateLikeQuery);
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.CHANGE_LIKE_ON));
        }
        else {
            const updateLikeQuery = `UPDATE webtoonIdx SET (likeIdx, webtoonIdx, userIdx, likeOnOff) VALUES (${getLikeQuery[0]['likeOnOff']}, ${req.body.webtoonIdx}, ${req.body.userIdx}, 0)`
            await db.queryParam_None(updateLikeQuery);
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.CHANGE_LIKE_OFF));
        }
    }


})

module.exports = router;