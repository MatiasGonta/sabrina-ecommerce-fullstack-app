import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mercadopago from 'mercadopago';
import {
    CreatePreferencePayload,
    PreferenceBackUrl,
    PreferencePayer,
    PreferenceShipment
} from 'mercadopago/models/preferences/create-payload.model';
import { Currency } from 'mercadopago/shared/currency';
import { Item, OrderModel, ProductModel } from '../models';

export const keyRouter = express.Router();

// PayPal
keyRouter.get('/paypal', asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
}));

// Mercado Pago
keyRouter.post('/mercadopago/create-order', asyncHandler(async (req: Request, res: Response) => {
    try {
        mercadopago.configure({
            access_token: process.env.MERCADOPAGO_TOKEN!
        })

        const { order, user } = req.body;

        const orderItems: [{
            title: string,
            picture_url: string,
            unit_price: number,
            currency_id: Currency
            quantity: number
        }] = order.orderItems.map((item: Item) => {
            const { image, quantity, name } = item;

            const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100

            const itemPrice = round2(item.price);
            const taxPrice = round2(0.05 * itemPrice);
            const totalPrice = itemPrice + taxPrice;

            return {
                title: name,
                picture_url: image,
                unit_price: totalPrice,
                currency_id: 'USD',
                quantity: quantity
            }
        });

        const preference: CreatePreferencePayload = {
            binary_mode: true,
            items: orderItems,
            back_urls: {
                success: `http://localhost:5173/order/${order._id}`,
                failure: `http://localhost:5173/order/${order._id}`,
                pending: ''
            } as PreferenceBackUrl,
            payer: {
                name: user.name.split(' ')[0],
                surname: user.name.split(' ')[1] ?? '',
                email: user.email,
                address: {
                    zip_code: order.shippingAddress.postalCode
                }
            } as PreferencePayer,
            shipments: {
                cost: order.shippingPrice,
            } as PreferenceShipment,
            statement_descriptor: "SABRINA",
            notification_url: `https://7285-181-93-87-117.ngrok.io/api/keys/notify/${order._id}`, //It will be changed in the production stage
            auto_return: 'approved'
        };

        const data = await mercadopago.preferences.create(preference);

        res.status(201).json({ message: 'Creando orden', url: data.body.init_point });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error: error });
    }
}));

keyRouter.post('/notify/:id', asyncHandler(async (req: Request, res: Response) => {
    try {
        const type = req.query.type || req.query.topic;

        if (type === 'payment') {
            const paymentId = req.query['data.id'] || req.query.id;

            const data = await mercadopago.payment.findById(Number(paymentId));

            let paymentStatus = data.body.status;

            if (paymentStatus === 'approved') {
                const order = await OrderModel.findById(req.params.id);

                if (order) {
                    order.isPaid = true;
                    order.paidAt = new Date(Date.now());
                    order.paymentResult = {
                        paymentId: data.body.id,
                        status: paymentStatus,
                    };

                    const updatedOrder = await order.save();

                    const itemsToUpdate = order.orderItems;

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

                    res.send({ order: updatedOrder, message: 'El pedido se pagó con éxito' });
                } else {
                    res.status(404).json({ message: 'Pedido no encontrado' });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}));