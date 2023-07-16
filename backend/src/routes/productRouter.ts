import express from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models';

export const productRouter = express.Router();

productRouter.get('/', asyncHandler(
        async (req, res) => {
            const products = await ProductModel.find();
            res.json(products);
        }
    )
);

productRouter.get('/slug/:slug', asyncHandler(
    async (req, res) => {
        const products = await ProductModel.findOne({ slug: req.params.slug });
        products ? res.json(products) : res.status(404).json({ message: 'Product Not Found' });
    }
)
);