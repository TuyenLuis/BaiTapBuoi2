const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const questionRouter = require("./router/questionRouter");
const questionModel = require("./models/questionModel");
const mongoose = require("mongoose");


let app = express();


app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");




app.get('/', function(req, res){
    questionModel.find((err, questionList) => {
        let ques = questionList[Math.floor(Math.random() * questionList.length)];
        console.log(ques);
        res.render("answer", {
            Question: ques,
            answer: "background-color: #111;"
        });
    })
});

app.use(bodyParser.urlencoded({ extended: false}));

app.use("/question", questionRouter);



app.get("/answer/:questionID/:vote", function(req, res){
    
    let question = questionModel.findOne({'_id': req.params.questionID}, (err, ques) => {
        if(err) console.log(err);
        else{
            let voteNumber = ques[req.params.vote] + 1;
            
            if(req.params.vote === 'yes'){
                questionModel.findOneAndUpdate({'_id': req.params.questionID}, {'yes': voteNumber}, (err, doc, res) => {
                    if(err) console.log(err);
                    else console.log("Update success!");
                })
            }
            else{
                questionModel.findOneAndUpdate({'_id': req.params.questionID}, {'no': voteNumber}, (err, doc, res) => {
                    if(err) console.log(err);
                    else console.log("Update success!");
                    
                })
            };
        }
        ques.save();
        
        
    })
    res.redirect("/question/" + req.params.questionID);
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