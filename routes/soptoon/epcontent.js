var express = require('express');
var router = express.Router();

const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');
/*
    METHOD  : GET
    url     : /soptoon/epcontent/:episodeIdx
    웹툰 에피소드 상세보기 가져오기
*/
router.get('/:episodeIdx', async(req, res) => {
    //db에서 선택한 웹툰idx에 맞는 에피소드 가져옴
    const edisodeIdx = req.params.edisodeIdx;
 
    const getEpisodecontentQuery = "SELECT * FROM episodecontent WHERE episodeIdx = ?";
    const getEpisodecontentResult = await db.queryParam_Arr(getEpisodecontentQuery, episodeIdx);
 
    const getEpisodeTitleQuert = "SELECT * FROM "
    if(!getEpisodecontentResult) {
         res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.EPISODE_CONTENT_DB_SELECT_ERROR));
    } else if (getEpisodeResult == 0) {
         res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_EMPTY)); 
    } else {
         res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_SUCCESS, getEpisodeResult)); 
    }
 
 });