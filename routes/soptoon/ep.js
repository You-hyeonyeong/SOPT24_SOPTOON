var express = require('express');
var router = express.Router();

const upload = require('../../config/multer')
const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');
const moment = require('moment-timezone');

/*
    METHOD  : GET
    url     : /soptoon/ep/:webtoonIdx
    웹툰 에피소드 보기
*/
router.get('/:webtoonIdx', async(req, res) => {
   //db에서 선택한 웹툰idx에 맞는 에피소드 가져옴
   const webtoonIdx = req.params.webtoonIdx;

   const getEpisodeQuery = "SELECT * FROM episode WHERE webtoonIdx = ? ORDER BY episodeDate DESC";
   const getEpisodeResult = await db.queryParam_Arr(getEpisodeQuery, webtoonIdx);

   if(!getEpisodeResult) {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.EPISODE_DB_SELECT_ERROR));
   } else if (getEpisodeResult == 0) {
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_EMPTY)); 
   } else {
        res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_SUCCESS, getEpisodeResult)); 
   }

});

/*
    METHOD  : POST
    url     : /soptoon/ep/:webtoonIdx
    웹툰 에피소드 등록하기
    body - episodeTitle, episodeThumnail, episodeContentImg
*/
 router.post('/:webtoonIdx', upload.fields([{name : 'thumnail'}, {name : 'content'}]), async(req, res) => {

    const webtoonIdx = req.params.webtoonIdx;

    const episodeTitle = req.body.title;
    const episodeThumnail = req.files.thumnail;
    const episodeContentImg = req.files.content;
    
     const bodyJson = {
        episodeTitle : req.body.title,
        episodeThumnail : req.files.thumnail.location,
        episodeContentImg : req.files.content.location
     };

    moment.tz.setDefault("Asia/Seoul");
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
  
    if (episodeTitle == null || episodeThumnail == null || episodeContentImg == null){
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.WRITE_VALUE));
    } else {
        const episodeInsertQuery = "INSERT INTO episode (episodeTitle, episodeDate, episodeThumnail, webtoonIdx, episodecontentImg) VALUE (?, ?, ?, ?, ?)"
        const episodeResultQuery = await db.queryParam_Parse(episodeInsertQuery,[episodeTitle, date, episodeThumnail[0].location, webtoonIdx, episodeContentImg[0].location])
        console.log(episodeResultQuery); 
        if(!episodeResultQuery){
            res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.EPISODE_DB_CREATE_ERROR));
        } else {
            res.status(200).send(utils.successTrue(statusCode.CREATE, resMessage.EPISODE_CREATE, bodyJson));
        }
    }
});

module.exports = router;