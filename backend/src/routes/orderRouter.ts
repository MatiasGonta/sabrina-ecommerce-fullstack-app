import express from 'express';
import { isAuthenticated as isAuth } from '../utilities';
import { createOrder, deleteOrder, getOrderById, getAllOrders, updateOrder, getSales } from '../controllers/order.controllers';

export const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, getAllOrders);

orderRouter.get('/sales', isAuth, getSales);

orderRouter.put('/update-order/:id', isAuth, updateOrder);

orderRouter.delete('/delete-order/:id', isAuth, deleteOrder);

orderRouter.post('/create-order', isAuth, createOrder);

orderRouter.get('/:id', isAuth, getOrderById);