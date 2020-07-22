import express from "express";

export const userRouter = express.Router(); // userRouter 객체도 다른 곳에서 사용합니다.

userRouter.get("/", (req, res) => res.send("Test"));
