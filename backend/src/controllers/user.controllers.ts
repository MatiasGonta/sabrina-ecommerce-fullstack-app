import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User, UserModel } from "../models";
import { generateToken } from "../utilities";

export const signin = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });

                return
            }
        }
        res.status(401).json({ message: 'Invalid email or password' });
    }
);

export const signup = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await UserModel.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password)
            } as User
        );

        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            }
        );
    }
);

export const getProfileDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { _id } = req.query;

        const user = await UserModel.findOne({ _id });
        
        if (user) {
            res.json(user);
            return;
        }

        res.status(401).json({ message: 'User not found' });
    }
);