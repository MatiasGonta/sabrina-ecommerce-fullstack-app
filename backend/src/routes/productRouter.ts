import express from 'express';
import { getFiltersCounts, getProductBySlug, getProducts, searchProducts, updateProductsStock } from '../controllers';

export const productRouter = express.Router();

productRouter.get('/', getProducts);

productRouter.get('/filter-counts', getFiltersCounts);

productRouter.get('/search', searchProducts);

productRouter.get('/slug/:slug', getProductBySlug);

productRouter.put('/update-stock', updateProductsStock);