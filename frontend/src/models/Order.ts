import { CartItem, ShippingAddress } from './Cart'
import { User } from './User'

export type Order = {
  _id: string
  orderItems: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: 'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe'
  userId: User['_id']
  userEmail: User['email']
  createdAt: string
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
  isCancelled: boolean
  cancelledAt: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}