const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const apiRouter = require("./routers/apiRouter");

let app = express();
const port = 6969;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api", apiRouter);

mongoose.connect("mongodb://localhost:27017/techkids-hotgirl",{ useNewUrlParser: true }, (err) => {
    if(err) console.error(err);
    else console.log("DB connect success!");
})

app.listen(port, (err) => {
    if(err) console.error(err);
    else console.log("Server is running at port " + port);
})

