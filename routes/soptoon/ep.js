var express = require('express');
var router = express.Router();

const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');

/*
    METHOD  : GET
    url     : /soptoon/ep/:webtoonIdx
    웹툰 에피소드 가져오기
*/
router.get('/:webtoonIdx', async(req, res) => {
   //db에서 선택한 웹툰idx에 맞는 에피소드 가져옴
   const webtoonIdx = req.params.webtoonIdx;

   const getEpisodeQuery = "SELECT * FROM episode WHERE webtoonIdx = ? ORDER BY episodeDate ASC";
   const getEpisodeResult = await db.queryParam_Arr(getEpisodeQuery, webtoonIdx);

   if(!getEpisodeResult) {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.EPISODE_DB_SELECT_ERROR));
   } else if (getEpisodeResult == 0) {
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_EMPTY)); 
   } else {
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_SUCCESS, getEpisodeResult)); 
   }

});

module.exports = router;