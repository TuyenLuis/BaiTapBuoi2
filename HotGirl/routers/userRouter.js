const express = require("express");
const userRouter = express.Router();

const UserModel = require("../models/userModel");


//Crud - Create - Read - Update - Delete

//get all: GET -> /api/users
userRouter.get("/", (req, res) => {
    UserModel.find({}, (err, users) => {
        if(err) res.status(500).send({success: 0, errMsg: err});
        else res.send({success: 1, users});
    });
});


//create new: Post ->
userRouter.post("/", (req, res) => {
    const {username, email, password, avatarUrl, name} = req.body;
    UserModel.create({username, email, password, avatarUrl, name}, (err, userCreated) => {
        if(err) res.status(500).send({success: 0, errMsg: err});
        else res.status(201).send({success: 1, userCreated});
    });
});

//Populate

//Get by id: userRouter.get
userRouter.get("/:userID", (req, res) => {
    UserModel.findById(req.params.userID, (err, user) => {
        if(err) res.status(500).send({success: 0, errMsg: err});
        else res.send({success: 1, user});
    })
})

//update by id: userRouter.put
userRouter.put("/:userID", (req, res) => {
    const {username, email, password, avatarUrl, name} = req.body;
    UserModel.findByIdAndUpdate(req.params.userID, {username, email, password, avatarUrl, name}, (err, userUpdated) => {
        if(err) res.status(500).send({success: 0, errMsg: err});
        else res.send({success: 1});
    })
})

//Delete by id: userRouter.delete
userRouter.delete("/:userID", (req, res) => {
    UserModel.findByIdAndRemove(req.params.userID, (err, user) => {
        if(err) res.status(500).send({success: 0, errMsg: err});
        else res.send({success: 1, user});
    })
})



module.exports = userRouter;