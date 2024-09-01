const express = require("express");
const { noteGet, notePost, notePut } = require("../controller/notes.controller");
const { userGet,userLog,userPost,userPut } = require("../controller/user.controller");
const { auth } = require("../middelware/auth.middelware");
const userRouter = new express.Router();

userRouter.get("/user" , auth , userGet );
userRouter.post("/user/login" , userLog );
userRouter.post("/user" , userPost );
userRouter.put("/user" , auth , userPut );

userRouter.get("/note/:slug" , noteGet );
userRouter.post("/note" , notePost );
userRouter.put("/note", notePut );

userRouter.post("/user/note", auth , notePost );
userRouter.put("/user/note", auth, notePut );

module.exports = userRouter