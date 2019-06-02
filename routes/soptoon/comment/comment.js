var express = require('express');
var router = express.Router();

const utils = require('../../../utils/utils');
const resMessage = require('../../../utils/responseMessage');
const statusCode = require('../../../utils/statusCode');
const db = require('../../../module/pool');

const moment = require('moment');

router.get('/:episodeIdx', async (req, res) => {
    let commentJson = {};
    const getCommentQuery = `SELECT * FROM comment WHERE episodeIdx = ${req.params.episodeIdx}`;
    const getCommentDb = await db.queryParam_None(getCommentQuery);

    commentJson['count'] = getCommentDb.length;
    let arrayList = await Promise.all(getCommentDb.map(async (data) => {
        const userQuery = `SELECT userName FROM user WHERE userIdx = ${data['userIdx']}`;
        const userNameDb = await db.queryParam_None(userQuery);
        let oneCommentJson = {
            userName: userNameDb[0]['userName'],
            date: moment().format('YY.MM.DD HH:MM'),
            commentImg: data.commentImg,
            comment: data.comment
        };
        return oneCommentJson;
    }))
    commentJson['list'] = arrayList;
    if(!commentJson) {
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.GET_COMMENT_FAIL));
    } else {
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.GET_COMMENT_SUCCESS, commentJson));
        console.log(commentJson);
    }
    
});

module.exports = router;