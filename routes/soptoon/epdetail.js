var express = require('express');
var router = express.Router();

const upload = require('../../config/multer')
const utils = require('../../utils/utils');
const resMessage = require('../../utils/responseMessage');
const statusCode = require('../../utils/statusCode');
const db = require('../../module/pool');
/*
    METHOD  : GET
    url     : /soptoon/epdetail/:episodeIdx
    웹툰 에피소드 상세보기 가져오기
*/
router.get('/:episodeIdx', async(req, res) => {
    //db에서 선택한 웹툰idx에 맞는 에피소드 가져옴
    const episodeIdx = req.params.episodeIdx;
    const getEpisodecontentQuery = "SELECT * FROM episodecontent WHERE episodeIdx = ?";
       console.log(getEpisodecontentResult[0].webtoonIdx); 
       const getEpisodecontentResult = await db.queryParam_Arr(getEpisodecontentQuery, episodeIdx);

 });

 module.exports = router;