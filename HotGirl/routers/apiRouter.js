const express = require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");
const imageRouter = require("./imageRouter");

apiRouter.get("/", (req, res) => {
    res.send("Hello ApiRouter");
})

apiRouter.use("/users", userRouter);

apiRouter.use("/images", imageRouter);



module.exports = apiRouter;