import express from "express";
import { getProfileDetails, signin, signup, getAllUsers, getUsersStatistics, deleteUser, updateUser, verifyUser, sendRestorePasswordEmail, restorePassword } from "../controllers";

export const userRouter = express.Router();

userRouter.post('/signin', signin);

userRouter.post('/signup', signup);

userRouter.post('/reset-password', sendRestorePasswordEmail);

userRouter.put('/reset-password/:token', restorePassword);

userRouter.delete('/delete-user/:id', deleteUser);

userRouter.put('/update-user/:id', updateUser);

userRouter.get('/profile/:id', getProfileDetails);

userRouter.put('/verify/:token', verifyUser);

userRouter.get('/mine', getAllUsers);

userRouter.get('/statistics', getUsersStatistics);