const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/questionModel");

router.use((req, res, next) => {
    console.log("Api router");
    next();
})

router.post('/addquestion', (req, res) => {
    let newQuestion = {
        content: req.body.question
    };
    QuestionModel.create(newQuestion, (err, questionCreated) => {
        if(err) return res.status(500).send({ success: 0, errMsg: err});

        else return res.status(201).send({success: 1, questionID: questionCreated._id});
    });
})

router.get('/otherquestion', (req, res) => {
    QuestionModel.countDocuments({}, (err, questionListLength) => {
        //skip: bỏ qua bao nhiêu bản ghi
        let randomIndex = Math.floor(Math.random() * questionListLength);
        QuestionModel.findOne({}).skip(randomIndex).exec((err, questionFound) => {
            if(err)   res.status(500).send({ success: 0, errMsg: err});
            else{               
                res.status(201).send({success: 1, question: questionFound});
            }
        })
    })
})

module.exports = router;