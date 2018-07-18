const express = require("express");
const router = express.Router();

const QuestionModel = require("../models/questionModel");
router.get("/:questionID", (req, res) =>{
    QuestionModel.findById(req.params.questionID, (err, ques) => {
        if (err) console.log(err);
        else{
            res.render("question", {
                Question: ques,
                totalVote: ques.yes + ques.no
            })
        }
    });
})

router.post("/add", (req, res) =>{
    let newQuestion = {
        content: req.body.question
    };
    QuestionModel.create(newQuestion, (err, questionCreated) => {
        if(err) console.error(err);
        else res.redirect('/question/' + questionCreated._id)
    });

    
});


module.exports = router;

// app.post("/question/add", function(req, res){
//     console.log(req.body);
//     let newQuestion = {
//         content: req.body.question,
//         yes: 0,
//         no: 0, 
//         id: questionList.length
//     };
//     questionList.push(newQuestion);
//     fs.writeFileSync('./ques.json', JSON.stringify(questionList));
//     res.redirect('/question/' + newQuestion.id)
// });

// app.get("/question/:questionID", function(req, res){
//     //param: lấy dữ liệu từ  1 phần trên đường dẫn
//     // cú pháp ":variable"
//     let ques = questionList[req.params.questionID];
//     res.render("question",{
//         Question: ques,
//         totalVote: ques.yes + ques.no
//     })
// })
