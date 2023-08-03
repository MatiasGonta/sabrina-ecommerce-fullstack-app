import express from 'express';
import { getFiltersCounts, getProductBySlug, getProducts } from '../controllers';

export const productRouter = express.Router();

productRouter.get('/', getProducts);

productRouter.get('/filter-counts', getFiltersCounts);

productRouter.get('/slug/:slug', getProductBySlug);