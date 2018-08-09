const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let InfoSchema = new Schema({
    p1: {type : String, required: true},
    p2: {type : String, required: true},
    p3: {type : String, required: true},
    p4: {type : String, required: true},
    s1: {type : Number,  default: 0},
    s2: {type : Number,  default: 0},
    s3: {type : Number,  default: 0},
    s4: {type : Number,  default: 0}
});

module.exports = mongoose.model("Info",InfoSchema);