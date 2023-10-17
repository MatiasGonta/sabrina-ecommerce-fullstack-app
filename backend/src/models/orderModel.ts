import mongoose, { Schema, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ProductItem } from './productModel';
import { User } from './userModel';

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Item extends Document {
  name: string;
  quantity: number;
  category: string;
  colorSelected: string;
  sizeSelected: string;
  countInStock: number;
  image: string;
  price: number;
  product?: ProductItem['_id'];
}

interface PaymentResult {
  paymentId: string;
  status: string;
}

export interface Order extends Document {
  orderItems: Item[];
  shippingAddress?: ShippingAddress;
  userId: User['_id'];
  userEmail: User['email'];
  paymentMethod: 'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe';
  paymentResult?: PaymentResult;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  isCancelled: boolean;
  cancelledAt?: Date;
}

const shippingAddressSchema = new Schema<ShippingAddress>({
  fullName: String,
  address: String,
  city: String,
  postalCode: String,
});

export const itemSchema = new Schema<Item>({
  name: String,
  category: String,
  quantity: Number,
  colorSelected: String,
  sizeSelected: String,
  countInStock: Number,
  image: String,
  price: Number,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'ProductItem'
  },
});

const paymentResultSchema = new Schema<PaymentResult>({
  paymentId: String,
  status: String,
});

const orderSchema = new Schema<Order>({
  orderItems: [itemSchema],
  shippingAddress: shippingAddressSchema,
  userId: {
    type: String,
    ref: 'User'
  },
  userEmail: {
    type: String,
    ref: 'User'
  },
  paymentMethod: String,
  paymentResult: paymentResultSchema,
  itemsPrice: {
    type: Number,
    required: true,
    default: 0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: Date,
}, {
  timestamps: true
});

orderSchema.plugin(mongoosePaginate);

export const OrderModel = mongoose.model<Order>('Order', orderSchema);