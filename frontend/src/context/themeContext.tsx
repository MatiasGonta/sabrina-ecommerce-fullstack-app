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
  cartClear: () => void;
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
  cartClear: () => {},
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
    const existItem = cart.cartItems.find((cartItem: CartItem) => cartItem._id === newItem._id);
    const updatedCartItems = existItem
      ? cart.cartItems.map((cartItem: CartItem) => (cartItem._id === existItem._id ? newItem : cartItem))
      : [...cart.cartItems, newItem];

    setCart({ ...cart, cartItems: updatedCartItems });
    setLocalStorage('cartItems', updatedCartItems);
  };

  const removeItemToCart = (item: CartItem) => {
    const cartItems = cart.cartItems.filter(
      (cartItem: CartItem) => cartItem._id !== item._id
    );
    setLocalStorage('cartItems', cartItems);
    setCart({ ...cart, cartItems });
  }

  const cartClear = () => {
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
    cartClear,
    saveShippingAddress,
    savePaymentMethod
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};