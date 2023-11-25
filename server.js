const express=require("express");
const app=express();
const path = require("path");
app.use(express.json());
const questionPaperGenerator=require("./routes/QuestionPaperGenerator_route");
app.use("/", questionPaperGenerator);


const PORT=5000;
app.listen(PORT,(error)=>{
    console.log(`server is running on ${PORT}`);
})