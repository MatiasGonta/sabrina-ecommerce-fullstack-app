import { CartItem, Product } from "@/models";

export const convertProductToCartItem = (product: Product, selectedColor: string, selectedSize: string): CartItem => {
    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      colorSelected: selectedColor,
      sizeSelected: selectedSize,
      countInStock: product.countInStock,
      quantity: 1,
    }
    
    return cartItem;
  }