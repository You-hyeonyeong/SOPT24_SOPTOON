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
    const episodeIdx = req.params.episodeIdx;
    const getEpisodecontentQuery = "SELECT * FROM episodecontent WHERE episodeIdx = ?";
       console.log(getEpisodecontentResult[0].webtoonIdx); 
       const getEpisodecontentResult = await db.queryParam_Arr(getEpisodecontentQuery, episodeIdx);

    //d여기서 나온 webtoonIdx를 가지고 webtoon 테이블에서 webtoonTitle조회해서 가져와야하잖아요?
  
  // 웹툰 이름 찾아서 업데이트 시키고 넣기!
  //그리고 res보내주기 맞죠?


    // const obj = JSON.parse(getEpisodecontentResult);
    // console.log(obj[0].webtoonIdx);
    //  const getWebtoonTitleQuery = "SELECT webtoonTitle FROM webtoon WHERE webtoonIdx = ?"
    //  const updateWebtoonTitleQuery = "UPDATE episodecontent SET webtoonTitle = '변경할값' WHERE 웹툰IDX가 인사람"

    // const getEpisodecontentQuery = "SELECT * FROM episodecontent WHERE episodeIdx = ?";
    // const getEpisodecontentResult = await db.queryParam_Arr(getEpisodecontentQuery, episodeIdx);
    // console.log(getEpisodecontentResult);
   
    // if(!getEpisodecontentResult) {
    //      res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.EPISODE_CONTENT_DB_SELECT_ERROR));
    // } else if (getEpisodeResult == 0) {
    //      res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_EMPTY)); 
    // } else {
    //      res.status(200).send(utils.successTrue(statusCode.OK, resMessage.EPISODE_SUCCESS, getEpisodeResult)); 
    // }
 
 });

 router.post('/:episodeIdx',upload.array('images'), async(req, res) => {
     const episodeIdx = req.params.episodeIdx;
     const episodecontentImg = req.body.img;
     const episodecontentInsertQuery = "INSERT INTO episodecontent (episodeIdx, episodecontentImg, webtoonIdx, webtoonTitle) VALUE (?, ?, ?, ?) "
     const webtoonIdx = "SELECT webtoonIdx FROM episodecontent WHERE episodeIdx = ?"
     if(req.file.length < 1) {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.UPLOAD_FILE));
     }
     const getEpisodecontentQuery = "SELECT * FROM episodecontent WHERE episodeIdx = ?";
     const getEpisodecontentResult = await db.queryParam_Arr(getEpisodecontentQuery, episodeIdx);
     console.log(getEpisodecontentResult[0].webtoonIdx); 

     episodecontentInsertResult = await db.queryParam_Parse(episodecontentInsertQuery,[episodeIdx,episodecontentImg,getEpisodecontentResult[0].webtoonIdx])


 })
 module.exports = router;