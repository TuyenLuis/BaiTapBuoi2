const express = require("express");

const fs = require("fs");

const hbs = require("express-handlebars");

const bodyParser = require("body-parser");
let app = express();

const questionList = require("./ques.json");

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");



const question = function(arr){
    var i = Math.floor(Math.random() * arr.ques.length);
    return arr.ques[i];
}

app.get('/', function(req, res){
    let randomNum = Math.floor(Math.random() * questionList.length);
    let ques = questionList[randomNum];
    res.render("answer", {
        //Question: question(q),
        Question: ques,
        answer: "background-color: #111;"
    });
});

app.use(bodyParser.urlencoded({ extended: false}));

app.post("/question/add", function(req, res){
    console.log(req.body);
    let newQuestion = {
        content: req.body.question,
        yes: 0,
        no: 0, 
        id: questionList.length
    };
    questionList.push(newQuestion);
    fs.writeFileSync('./ques.json', JSON.stringify(questionList));
    res.redirect('/question/' + newQuestion.id)
});

app.get("/question/:questionID", function(req, res){
    //param: lấy dữ liệu từ  1 phần trên đường dẫn
    // cú pháp ":variable"
    let ques = questionList[req.params.questionID];
    res.render("question",{
        Question: ques,
        totalVote: ques.yes + ques.no
    })
})

app.get("/answer/:questionID/:vote", function(req, res){
    // let ques = questionList[req.params.questionID];
    // ques[req.params.vote] += 1;
    questionList[req.params.questionID][req.params.vote] += 1;
    fs.writeFileSync('./ques.json', JSON.stringify(questionList));
    res.redirect("/question/" + req.params.questionID);
})



// app.get("/question", function(req, res){
//     //param: lấy dữ liệu từ  1 phần trên đường dẫn
//     // cú pháp ":variable"
//     let ques = questionList[req.query.questionID];
//     res.render("question",{
//         ques,
//         totalVote: ques.yes + ques.no
//     })
//     // http://localhost:8080/question?questionID=1&Hello=true
//     console.log(req.query);
// })

// fs.readFile("questions.json","utf8",  function(err, data){
//     if(err) console.log(err);
//     else {
//         let q = JSON.parse(data.toString());
//         let randomNum = Math.floor(Math.random() * questionList.length);
//         let ques = questionList[randomNum];
//         app.get('/', function(req, res){
//             res.render("answer", {
//                 //Question: question(q),
//                 Question: ques,
//                 answer: "background-color: #111;"
//             });
//         });
//     }

// });

app.get('/ask', function(req, res){
    res.render("ask",{
        ask: "background-color: #111;"
    });
});






app.use(express.static("./css"));
//app.use(express.static("./script"));


app.listen(8080, function(err){
    if(err) console.log(err);
    else console.log("Server is running at port: 8080");
});