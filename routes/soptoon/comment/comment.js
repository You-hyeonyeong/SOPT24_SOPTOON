var express = require('express');
var router = express.Router();

const upload = require('../../../config/multer')
const utils = require('../../../utils/utils');
const resMessage = require('../../../utils/responseMessage');
const statusCode = require('../../../utils/statusCode');
const db = require('../../../module/pool');

const moment = require('moment');



//댓글 보기
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
    if (!commentJson) {
        res.status(400).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.GET_COMMENT_FAIL));
    } else {
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.GET_COMMENT_SUCCESS, commentJson));
        console.log(commentJson);
    }

});

//댓글 쓰기
//이미지 링크, userIdx, comment, commentDate -> moment, episodeIdx -> params
//이미지 , comment, userId
router.post('/:episodeIdx', upload.single("commentImg"), async (req, res) => {
    const reqEpisodesIdx = req.params.episodeIdx;
    let reqBodyJson = req.body;
    const userQuery = `SELECT userIdx FROM user WHERE userId = ${reqBodyJson.userId}`;
    const userNameDb = await db.queryParam_None(userQuery);

    let commentDataJson = {
        commentImg: req.file.location,
        userIdx: userNameDb[0].userIdx,
        comment: reqBodyJson.commentContent,
        commentDate: moment().format("YYYY-MM-DD"),
        episodeIdx: Number(reqEpisodesIdx),
    }

    console.log(commentDataJson);

    if (userNameDb != undefined) {
        const enrollCommentQuery = `INSERT INTO comment(commentImg, userIdx, comment, commentDate, episodeIdx) 
        VALUES ('${commentDataJson.commentImg}',${commentDataJson.userIdx},'${commentDataJson.comment}',${commentDataJson.commentDate},${commentDataJson.episodeIdx})`;
        console.log(enrollCommentQuery);
        
        const result = await db.queryParam_None(enrollCommentQuery);
        console.log(result);
        if(!result){
            res.status(403).send(utils.successFalse(statusCode.FORBIDDEN, resMessage.ENROLL_COMMENT_FAIL));
        } else {
            res.status(200).send(utils.successTrue(statusCode.OK, resMessage.ENROLL_COMMENT_SUCCESS, commentDataJson)); 
        }        
    } else {
        res.status(400).send(utils.successFalse(statusCode.OK, resMessage.GET_COMMENT_FAIL));
    }

})
module.exports = router;