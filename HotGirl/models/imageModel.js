const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//owner- like -post date - comment - view - image url - description
const ImageSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    like: {type: Number, default: 0},
    comments: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        content: {type: String, require: true},
        created_at: {type: Date, default: new Date()}
    }],
    view: {type: Number, default: 0},
    imageUrl: {type: String},
    description: {type: String}
},{
    timestamps: true
});

module.exports = mongoose.model("Image", ImageSchema);