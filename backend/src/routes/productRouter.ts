import express from 'express';
import {
    getFiltersCounts,
    getCartItemsStock,
    getProductBySlug,
    getProductsCatalog,
    searchProducts,
    updateProductsStock,
    createProduct,
    updateProduct,
    productWithUpload,
    deleteProduct,
    getProducts
} from '../controllers';

export const productRouter = express.Router();

productRouter.get('/', getProductsCatalog);

productRouter.get('/mine', getProducts);

productRouter.get('/filter-counts', getFiltersCounts);

productRouter.get('/search', searchProducts);

productRouter.get('/stock', getCartItemsStock);

productRouter.get('/slug/:slug', getProductBySlug);

productRouter.put('/update-stock', updateProductsStock);

productRouter.delete('/delete-product/:id', deleteProduct);

productRouter.post('/create-product', productWithUpload, createProduct);

productRouter.put('/update-product', productWithUpload, updateProduct);