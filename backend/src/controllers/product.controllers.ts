import { Item, ProductItem, ProductModel } from "../models";
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { FilterQuery } from "mongoose";

export const getProducts = asyncHandler(async (req, res) => {
    const { page = 1, category, size, color, priceMin, priceMax } = req.query;

    const options = {
        page: parseInt(page as string),
        limit: 20
    };

    const filter: FilterQuery<ProductItem> = {};

    // Adding existing filters to the "filter" object
    if (category) {
        filter.category = category as string;
    }

    if (color) {
        filter.colors = { $in: color as string[] };
    }
    
    if (size) {
        filter.sizes = { $in: size as string[] };
    }

    if (priceMin || priceMax) {
        filter.price = {};
        
        if (priceMin && priceMax) {
            filter.price.$gte = parseFloat(priceMin as string);
            filter.price.$lte = parseFloat(priceMax as string);
        } else if (priceMin) {
            filter.price.$gte = parseFloat(priceMin as string);
        } else if (priceMax) {
            filter.price.$lte = parseFloat(priceMax as string);
        }
    }

    const products = await ProductModel.paginate(filter, options);

    if (products) {
        res.json(products);
    } else {
        res.status(404).json({ message: 'Products Not Found' });
    }
});

export const getFiltersCounts = asyncHandler(async (req: Request, res: Response) => {
        const filterCounts = {
            categories: await ProductModel.aggregate([
                { 
                    $group: {
                        _id: '$category',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]),
            sizes: await ProductModel.aggregate([
                {
                    $unwind: '$sizes'
                },
                {
                    $group: {
                        _id: '$sizes',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]),
            colors: await ProductModel.aggregate([
                {
                    $unwind: '$colors' 
                },
                {
                    $group: {
                        _id: '$colors',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]),
        };

        res.json(filterCounts);
    }
);

export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, q } = req.query;
    const regex = new RegExp(q as string, 'i');

    const options = {
        page: parseInt(page as string),
        limit: 20
    };
  
    // Search products with the expReg formed with the user's search
    const searchResults = await ProductModel.paginate({
        $or: [
          { name: regex },
          { brand: regex },
          { category: regex },
          { colors: regex },
          { sizes: regex }
        ]
    }, options);
  
    res.json(searchResults);
  }
);

export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
        const product = await ProductModel.findOne({ slug: req.params.slug });
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product Not Found' });
        }
    }
);

export const updateProductsStock = asyncHandler(async (req: Request, res: Response) => {
    const itemsToUpdate = req.body;
    
    for (let item of itemsToUpdate) {
        const variant = `${item.colorSelected}-${item.sizeSelected}`;
        
        // Find and update the product using its _id
        await ProductModel.findByIdAndUpdate(
            item._id,
            {
                $inc: { [`countInStockByVariant.${variant}`]: -item.quantity } // Subtract the order quantity from the stock
            },
            { new: true } // Return updated document
        );
    }

    res.json({ message: 'Stock updated successfully' });
});