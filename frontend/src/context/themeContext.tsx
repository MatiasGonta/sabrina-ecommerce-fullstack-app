import { Cart, CartItem, Product, ShippingAddress, UserInfo } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';
import React, { createContext, useState } from 'react';


interface ThemeContextInterface {
  favorites: Product[],
  cart: Cart;
  userInfo?: UserInfo;
  userSignin: (data: UserInfo) => void;
  userSignout: () => void;
  addProductToFavorites: (newFavoriteProduct: Product) => void;
  removeProductToFavorites: (inFavoriteProducts: Product) => void;
  addItemToCart: (item: CartItem) => void;
  removeItemToCart: (item: CartItem) => void;
  clearCart: () => void;
  saveShippingAddress: (address: ShippingAddress) => void;
  savePaymentMethod: (payment: string) => void;
}

interface ThemeProviderInterface {
  children: React.ReactNode;
}

const initialState = {
  favorites: getLocalStorage('favoriteProducts')
      ? JSON.parse(getLocalStorage('favoriteProducts')!)
      : [],
  cart: {
    cartItems: getLocalStorage('cartItems')
      ? JSON.parse(getLocalStorage('cartItems')!)
      : [],
    shippingAddress: getLocalStorage('shippingAddress')
      ? JSON.parse(getLocalStorage('shippingAddress')!)
      : {},
    paymentMethod: getLocalStorage('paymentMethod')
      ? JSON.parse(getLocalStorage('paymentMethod')!)
      : 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
  },
  userInfo: getLocalStorage('userInfo')
    ? JSON.parse(getLocalStorage('userInfo')!)
    : null,
};

const initialUserInfo: UserInfo = getLocalStorage('userInfo') ? JSON.parse(getLocalStorage('userInfo')!) : null;

export const ThemeContext = createContext<ThemeContextInterface>({
  favorites: initialState.favorites,
  cart: initialState.cart,
  userInfo: initialState.userInfo,
  userSignin: () => {},
  userSignout: () => {},
  addProductToFavorites: () => {},
  removeProductToFavorites: () => {},
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearCart: () => {},
  saveShippingAddress: () => {},
  savePaymentMethod: () => {}
});

export const ThemeProvider: React.FC<ThemeProviderInterface> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(initialState.cart);
  const [favorites, setFavorites] = useState<Product[]>(initialState.favorites);
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  const addProductToFavorites = (newFavoriteProduct: Product) => {
    const newFavorites = [...favorites, newFavoriteProduct];
    setFavorites(newFavorites);
    setLocalStorage('favoriteProducts', newFavorites);
  }

  const removeProductToFavorites = (inFavoriteProducts: Product) => {
    const newFavorites = favorites.filter((favoriteProducts: Product) => favoriteProducts._id !== inFavoriteProducts._id);
    setFavorites(newFavorites);
    setLocalStorage('favoriteProducts', newFavorites);
  }

  const addItemToCart = (item: CartItem) => {
    const newItem = item;

    // Check if another item with the same _id, color and size already exists in the cart
    const existItem = cart.cartItems.find(
      (cartItem: CartItem) =>
        cartItem._id === newItem._id &&
        cartItem.colorSelected === newItem.colorSelected &&
        cartItem.sizeSelected === newItem.sizeSelected
    );

    if (existItem) {
      // If it already exists, increase the amount
      const cartItems = cart.cartItems.map((cartItem: CartItem) =>
        cartItem._id === existItem._id && cartItem.colorSelected === existItem.colorSelected && cartItem.sizeSelected === existItem.sizeSelected
          ? { ...cartItem, quantity: newItem.quantity }
          : cartItem
      );
    

      setCart({ ...cart, cartItems });
      setLocalStorage('cartItems', cartItems);
    } else {
      // If it does not exist, add a new item to the cart
      const updatedCartItems = [...cart.cartItems, newItem];
      setCart({ ...cart, cartItems: updatedCartItems });a
      setLocalStorage('cartItems', updatedCartItems);
    }
  };

  const removeItemToCart = (item: CartItem) => {
    const updatedCartItems = cart.cartItems.filter(
      (cartItem: CartItem) => cartItem._id !== item._id || cartItem.colorSelected !== item.colorSelected || cartItem.sizeSelected !== item.sizeSelected
    );
    setLocalStorage('cartItems', updatedCartItems);
    setCart({ ...cart, cartItems: updatedCartItems });
  }

  const clearCart = () => {
    const newCart = { ...cart };
    newCart.cartItems = [];
    setCart(newCart);
  }

  const userSignin = (data: UserInfo) => setUserInfo({ ...data });

  const userSignout = () => {
    const emptyCart = {
      cartItems: [],
      paymentMethod: 'PayPal',
      shippingAddress: {
        fullName: '',
        address: '',
        postalCode: '',
        city: ''
      },
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0
    };
    setCart(emptyCart);
  };

  const saveShippingAddress = (address: ShippingAddress) => {
    const newCart = { ...cart };
    newCart.shippingAddress = address;
    setCart(newCart);
  }

  const savePaymentMethod = (payment: string) => {
    const newCart = { ...cart };
    newCart.paymentMethod = payment;
    setCart(newCart);
  }
  
  const themeContextValue: ThemeContextInterface = {
    favorites,
    cart,
    userInfo,
    userSignin,
    userSignout,
    addProductToFavorites,
    removeProductToFavorites,
    addItemToCart,
    removeItemToCart,
    clearCart,
    saveShippingAddress,
    savePaymentMethod
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};