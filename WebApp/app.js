const express = require("express");

const fs = require("fs");

const hbs = require("express-handlebars");

let app = express();

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");



const question = function(arr){
    var i = Math.floor(Math.random() * arr.ques.length);
    return arr.ques[i];
}



fs.readFile("questions.json","utf8",  function(err, data){
    if(err) console.log(err);
    else {
        let q = JSON.parse(data.toString());
        app.get('/', function(req, res){
            res.render("answer", {
                Question: question(q),
                answer: "background-color: #111;"
            });
        });
    }

});

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