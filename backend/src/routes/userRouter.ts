import express from "express";
import { signin, signup } from "../controllers";

export const userRouter = express.Router();

userRouter.post('/signin', signin);

userRouter.post('/signup', signup);