import { CartItem, Product } from "@/models";

export const convertProductToCartItem = (product: Product): CartItem => {
    const cartItem: CartItem = {
        image: product.image,
        slug: product.slug,
        quantity: 1,
        countInStock: product.countInStock,
        price: product.price,
        _id: product._id,
        name: product.name
    }
    
    return cartItem;
}