export type CartItem = {
    image: string
    slug: string
    category: string
    quantity: number
    countInStock: number
    price: number
    _id: string
    name: string
    colorSelected: string
    sizeSelected: string
}
  
export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    postalCode: string
}
  
export type Cart = {
    cartItems: CartItem[]
    shippingAddress: ShippingAddress
    paymentMethod: 'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe'
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
}