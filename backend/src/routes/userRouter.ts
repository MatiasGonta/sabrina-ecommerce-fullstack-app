import express from "express";
import { getProfileDetails, signin, signup } from "../controllers";

export const userRouter = express.Router();

userRouter.post('/signin', signin);

userRouter.post('/signup', signup);

userRouter.get('/profile', getProfileDetails);