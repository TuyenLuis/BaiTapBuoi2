const express = require("express");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const infoModel = require("./models/infoModel");
const bodyParser = require("body-parser");

let app = express();

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended : false}));


app.post("/games", (req, res) =>{

    let newInfo = {
        p1: req.body.player1,
        p2: req.body.player2,
        p3: req.body.player3,
        p4: req.body.player4
    };
    infoModel.create(newInfo, (err, infoCreated) => {
        if(err) console.error(err);
        else res.redirect('/games/' + infoCreated._id);
    });

    
});



app.get("/",function(req,res){
    res.render("createscreen");
});

app.get("/games/:gameID",function(req,res){
    infoModel.findById(req.params.gameID, (err, infoFound) => {
        if(err) console.error(err);
        else{
            res.render("playscreen", {
                Info: infoFound                  
            });
        }
    })
});

app.post("/addround", function(req, res){
    let id, s1, s2, s3, s4;
    id = req.body._id;
    s1 = req.body.s1;
    s2 = req.body.s2;
    s3 = req.body.s3;
    s4 = req.body.s4;
    console.log(req.body);
    infoModel.findOneAndUpdate({ '_id': id }, { 's1': s1, 's2': s2, 's3': s3, 's4':s4}, (err, body) => {
        if (err) return res.status(500).send({success: 0, errMsg: err});
        
         return res.status(201).send({success: 1, info: body});
    })
})

app.use(express.static("./css"));

mongoose.connect("mongodb://localhost:27017/scorekeeper",{ useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log("DB connect success!");
})

app.listen(8080, function(err){
    if(err) console.log(err);
    else console.log("Server is running at port: 8080");
});