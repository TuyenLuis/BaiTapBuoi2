const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const questionRouter = require("./router/questionRouter");
const apiRouter = require("./router/apiRouter");
const questionModel = require("./models/questionModel");

let app = express();


app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");




app.get('/', function(req, res){
    questionModel.countDocuments({}, (err, questionListLength) => {
        //skip: bỏ qua bao nhiêu bản ghi
        let randomIndex = Math.floor(Math.random() * questionListLength);
        questionModel.findOne({}).skip(randomIndex).exec((err, questionFound) => {
            if(err) console.error(err);
            else{
                res.render("answer", {
                    Question: questionFound,
                    answer: "background-color: #111;"
                });
            }
        })
    })
    // questionModel.find({}, (err, questionList) => {
    //     let ques = questionList[Math.floor(Math.random() * questionList.length)];
    //     console.log(ques);
    //     res.render("answer", {
    //         Question: ques,
    //         answer: "background-color: #111;"
    //     });
    // })
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use("/question", questionRouter);
app.use("/api", apiRouter);



app.get("/answer/:questionID/:vote", function(req, res){
    //tự làm
    // let question = questionModel.findOne({'_id': req.params.questionID}, (err, ques) => {
    //     if(err) console.log(err);
    //     else{
    //         let voteNumber = ques[req.params.vote] + 1;
            
    //         if(req.params.vote === 'yes'){
    //             questionModel.findOneAndUpdate({'_id': req.params.questionID}, {'yes': voteNumber}, (err, doc, res) => {
    //                 if(err) console.log(err);
    //                 else console.log("Update success!");
    //             })
    //         }
    //         else{
    //             questionModel.findOneAndUpdate({'_id': req.params.questionID}, {'no': voteNumber}, (err, doc, res) => {
    //                 if(err) console.log(err);
    //                 else console.log("Update success!");
                    
    //             })
    //         };
    //     }
    //     ques.save();
        
        
    // })

    //chữa

    // if(req.params.vote === 'yes') {
    //     questionModel.findByIdAndUpdate(req.params.questionID, {$inc: {yes: 1}}, (err, questionUpdate) => {
    //         if(err) console.error(err);
    //         res.redirect("/question/" + req.params.questionID);
    //     })
    // }
    // else if(req.params.vote === 'no'){
    //     questionModel.findByIdAndUpdate(req.params.questionID, {$inc: {no: 1}}, (err, questionUpdate) => {
    //         if(err) console.error(err);
    //         res.redirect("/question/" + req.params.questionID);
    //     })
    // }

    // questionModel.findByIdAndUpdate(req.params.questionID, {$inc: {[req.params.vote]: 1}}, (err, questionUpdate) => {
    //     if(err) console.error(err);
    //     res.redirect("/question/" + req.params.questionID);
    // })

    questionModel.findOne({_id: req.params.questionID}, (err, questionFound) => {
        if(err) console.error(err);
        else if (!questionFound){
            console.log("Éo tìm thấy");
        }
        else{
            ++questionFound[req.params.vote];

            questionFound.save((err) => {
                if(err) console.error(err);
                else res.redirect("/question/" + req.params.questionID);
            });
        }
    })
    
})


mongoose.connect("mongodb://localhost:27017/quyetde",{ useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log("DB connect success!");
})


app.get('/ask', function(req, res){
    res.render("ask",{
        ask: "background-color: #111;"
    });
});






app.use(express.static("./css"));


app.listen(8080, function(err){
    if(err) console.log(err);
    else console.log("Server is running at port: 8080");
});