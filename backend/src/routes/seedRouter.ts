import express, { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { ProductModel, UserModel } from "../models";
import { sampleProducts } from "../data";
import { sampleUsers } from "../data/users";

export const seedRouter = express.Router();

seedRouter.get('/', asyncHandler(
        async (req: Request, res: Response) => {
            await ProductModel.deleteMany({});
            const createdProducts = await ProductModel.insertMany(sampleProducts);

            await ProductModel.deleteMany({});
            const createdUsers = await UserModel.insertMany(sampleUsers);

            res.json({ createdProducts, createdUsers });
        }
    )
);