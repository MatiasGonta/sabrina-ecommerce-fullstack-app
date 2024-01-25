import express, { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import { OrderModel, ProductModel, UserModel } from "../models";
import { sampleProducts, sampleUsers } from "../data";

export const seedRouter = express.Router();

const clearCloudinaryStore = async () => {
  const { resources } = await cloudinary.api.resources();

  if (resources === 0) return;

  const preservePublicId = 'https://res.cloudinary.com/duihep83l/image/upload/v1696370881/sabrina-icon_clropi.png'.match(/\/v\d+\/(.+?)\./)![1];

  for (const image of resources) {
    if (image.public_id !== preservePublicId) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }
}

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    // clearCloudinaryStore();
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    await OrderModel.deleteMany({});
    const createdOrders = await OrderModel.insertMany([]);

    res.json({ createdProducts, createdUsers, createdOrders });
  })
);

seedRouter.get(
  '/products',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    // clearCloudinaryStore();
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    res.json({ createdProducts });
  })
);

seedRouter.get(
  '/users',
  asyncHandler(async (req: Request, res: Response) => {
    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    res.json({ createdUsers });
  })
);

seedRouter.get(
  '/orders',
  asyncHandler(async (req: Request, res: Response) => {
    await OrderModel.deleteMany({});
    const createdOrders = await OrderModel.insertMany([]);

    res.json({ createdOrders });
  })
);