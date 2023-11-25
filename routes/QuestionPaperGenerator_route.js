const express=require("express")
const router=express.Router();
const {questionPaperGenerator} =require("../controller/qp_generator");
router.route('/getquestion').post(questionPaperGenerator);
router.route('/').get(questionPaperGenerator);

module.exports=router;