import { Order, OrderModel, ProductItem } from "../models";
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, q, limit = 20, sort, order, user = false } = req.query;

  const options = {
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    sort: { createdAt: -1 } as { [key: string]: number }
  };

  let query: any = {};
  if (q) {
    const regex = new RegExp(q as string, 'i');
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (objectIdRegex.test(q as string)) {
      query = { $or: [{ _id: new mongoose.Types.ObjectId(q as string) }] };
    } else {
      query = {
        $or: [
          { userEmail: regex },
        ],
      };
    }
  }

  if (sort && order) {
    options.sort = { [sort as string]: order === 'asc' ? 1 : -1 };
  }

  if (user) {
    query.userId = req.user._id;
  }

  const orders = await OrderModel.paginate(query, options);

  if (orders) {
    res.status(201).json(orders);
  } else {
    res.status(404).json({ message: 'Pedidos no encontrados' });
  }
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      res.status(201).json(order);
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  }
);

export const deleteOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const orderId = req.params.id;

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (deletedOrder) {
      res.status(201).json({ message: 'Orden eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  }
);

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user || !req.user._id) {
    res.status(401).json({ message: 'Lo siento, parece que tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.' });
    return;
  }

  if (req.body.orderItems.length === 0) {
    res.status(400).json({ message: 'No se puede crear la orden. El carrito está vacío' });
  } else {
    const createdOrder = await OrderModel.create({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      userId: req.user._id,
      userEmail: req.user.email,
    } as Order);

    res.status(201).json({ message: 'Orden creada', order: createdOrder });
  }
});

export const updateOrder = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { delivered, paid, paymentMethod,paymentId } = req.body;
      const { id } = req.params;

      const order = await OrderModel.findById(id);

      if (order) {
        order.isPaid = paid;
        if (paid) order.paidAt = new Date(Date.now());
        order.isDelivered = delivered;
        if (delivered) order.deliveredAt = new Date(Date.now());
        order.paymentResult = {
          paymentId: paymentId ? paymentId : 'unnatural',
          status: 'approved'
        };
        if (order.paymentMethod !== paymentMethod) order.paymentMethod = paymentMethod;

        const updatedOrder = await order.save();

        res.status(201).json({
          order: updatedOrder,
          message: 'Orden actualizada',
          payMessage: 'El pago se ha registrado con éxito. ¡Gracias por su compra!'
        });
      } else {
        res.status(404).json({ message: 'Orden no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
);

export const getSales = asyncHandler(async (req: Request, res: Response) => {
  try {
    const sales = await OrderModel.find({ isPaid: true });

    // Create an object to store total sales per month
    const monthlySales: any = {};

    // Create an object to store total sales by category
    const salesByCategory: any = {};

    sales.forEach(order => {
      const { paidAt, orderItems, paymentMethod } = order;

      const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

      const itemsPrice = round2(orderItems.reduce((a,c) => a + c.quantity * c.price, 0));

      const taxPercentage = paymentMethod === 'PayPal'
                              ? 0.10 : paymentMethod === 'MercadoPago'
                              ? 0.05 : 0;

      const year = paidAt!.getFullYear();
      const month = paidAt!.getMonth() + 1;

      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

      if (!monthlySales[monthKey]) {
        monthlySales[monthKey] = { categorySales: {} }; // Initialize an object for the month with an empty "sales" property
      }

      orderItems.forEach(item => {
        const { category, price, quantity } = item;

        // Calculate cost for the item
        const itemPrice = price * quantity;
        const taxPrice = round2(taxPercentage * itemPrice);
        const shippingPrice = itemsPrice > 150 ? round2(0) : round2(10);
        const itemTotalPrice = itemPrice + taxPrice + shippingPrice;

        // Add the itemTotalPrice to the total for the category in this section
        if (!monthlySales[monthKey].categorySales[category]) {
          monthlySales[monthKey].categorySales[category] = 0;
        }

        monthlySales[monthKey].categorySales[category] += itemTotalPrice;

        // Add the itemTotalPrice to the total for the category
        if (!salesByCategory[category]) {
          salesByCategory[category] = 0;
        }

        salesByCategory[category] += itemTotalPrice;
      });
    });

    // Convert the monthlySales object into an array of objects
    const monthlySalesArr = Object.entries(monthlySales).map(([key, value]: [string, any]) => {
      const [year, month] = key.split('-');
      return {
        year: parseInt(year),
        month: parseInt(month),
        categorySales: value.categorySales,
        sales: Object.values(value.categorySales as number[]).reduce((acc: number, curr: number) => acc + curr, 0), // Calculate the total sales for the month
      };
    });

    // Sort the monthlySalesArr by month
    monthlySalesArr.sort((a, b) => a.month - b.month);

    if (sales && monthlySalesArr && salesByCategory) {
      res.json({
        sales,
        monthlySales: monthlySalesArr,
        salesByCategory
      });
    } else {
      res.status(404).json({ message: 'Ventas no encontradas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});