import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductItem, ProductModel } from '../models';
import { FilterQuery } from 'mongoose';

export const productRouter = express.Router();

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page = 1, category, size, color, priceMin, priceMax } = req.query;

    const options = {
      page: parseInt(page as string),
      limit: 20
    };

    const filter: FilterQuery<ProductItem> = {};

    // Aplicar filtros si se proporcionan
    if (category) {
      filter.category = category as string;
    }
    if (size) {
      filter.sizes = size as string;
    }
    if (color) {
      filter.colors = color as string;
    }
    if (priceMin && priceMax) {
      filter.price = { $gte: parseFloat(priceMin as string), $lte: parseFloat(priceMax as string) };
    } else if (priceMin) {
      filter.price = { $gte: parseFloat(priceMin as string) };
    } else if (priceMax) {
      filter.price = { $lte: parseFloat(priceMax as string) };
    }

    const products = await ProductModel.paginate(filter, options);

    res.json(products);
  })
);

productRouter.get(
  '/filter-counts',
  asyncHandler(async (req: Request, res: Response) => {
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
      priceRanges: [
        {
          name: 'Hasta $5.000',
          count: await ProductModel.countDocuments({ price: { $lte: 5000 } }),
          price: {
            priceMin: '',
            priceMax: '5000'
          }
        },
        {
          name: '$5.000 a $7.500',
          count: await ProductModel.countDocuments({ price: { $gt: 5000, $lte: 7500 } }),
          price: {
            priceMin: '5000',
            priceMax: '7500'
          }
        },
        {
          name: 'Más de $7.500',
          count: await ProductModel.countDocuments({ price: { $gt: 7500 } }),
          price: {
            priceMin: '7500',
            priceMax: ''
          }
        },
      ],
    };

    res.json(filterCounts);
  })
);

productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not Found' })
    }
  })
);