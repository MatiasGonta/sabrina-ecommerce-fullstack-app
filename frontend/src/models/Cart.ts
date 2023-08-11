export type CartItem = {
    image: string
    slug: string
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
    paymentMethod: string
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
}