import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { isAuthenticated } from '../utilities';
import { OrderModel, ProductItem } from '../models';

export const orderRouter = express.Router();

orderRouter.post('/', isAuthenticated, asyncHandler(async (req: Request, res: Response) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).json({ message: 'Cart is empty' });
        } else {
            const createdOrder = await OrderModel.create({
                orderItems: req.body.orderItems.map((x: ProductItem) => ({
                    ...x,
                    product: x._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            });
            res.status(201).json({ message: 'Order Not Found', order: createdOrder });
        }
    })
)