import { Cart, CartItem, ShippingAddress, UserInfo } from '@/models';
import React, { createContext, useState } from 'react';


interface ThemeContextInterface {
  mode: string;
  cart: Cart;
  userInfo?: UserInfo;
  userSignin: (data: UserInfo) => void;
  userSignout: () => void;
  addItemToCart: (item: CartItem) => void;
  removeItemToCart: (item: CartItem) => void;
  updateMode: (newMode: string) => void;
  saveShippingAddress: (address: ShippingAddress) => void
}

interface ThemeProviderInterface {
  children: React.ReactNode;
}

const initialState = {
  mode: localStorage.getItem('mode') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod')!)
      : 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
};

const initialUserInfo: UserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;

export const ThemeContext = createContext<ThemeContextInterface>({
  mode: initialState.mode,
  cart: initialState.cart,
  userInfo: initialState.userInfo,
  userSignin: () => {},
  userSignout: () => {},
  addItemToCart: () => {},
  removeItemToCart: () => {},
  updateMode: () => {},
  saveShippingAddress: () => {}
});

export const ThemeProvider: React.FC<ThemeProviderInterface> = ({ children }) => {
  const [mode, setMode] = useState<string>(initialState.mode);
  const [cart, setCart] = useState<Cart>(initialState.cart);
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>();

  const updateMode = (newMode: string) => {
    localStorage.setItem('mode', newMode);
    setMode(newMode);
  };

  const addItemToCart = (item: CartItem) => {
    const newItem = item;
    const existItem = cart.cartItems.find((cartItem: CartItem) => cartItem._id === newItem._id);
    const updatedCartItems = existItem
      ? cart.cartItems.map((cartItem: CartItem) => (cartItem._id === existItem._id ? newItem : cartItem))
      : [...cart.cartItems, newItem];

    setCart({ ...cart, cartItems: updatedCartItems });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeItemToCart = (item: CartItem) => {
    const cartItems = cart.cartItems.filter(
      (cartItem: CartItem) => cartItem._id !== item._id
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCart({ ...cart, cartItems });
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
        city: '',
        country: ''
      },
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0
    };
    setCart(emptyCart);

    const emptyMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setMode(emptyMode);
  };

  const saveShippingAddress = (address: ShippingAddress) => {
    const newCart = { ...cart };
    newCart.shippingAddress = address;
    setCart(newCart);
  }
  
  const themeContextValue: ThemeContextInterface = {
    mode,
    cart,
    userInfo,
    userSignin,
    userSignout,
    addItemToCart,
    removeItemToCart,
    updateMode,
    saveShippingAddress
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// import { Cart, CartItem } from "@/models";
// import React from "react";

// type AppState = {
//   mode: string;
//   cart: Cart;
// }

// const initialState: AppState = {
//   mode: localStorage.getItem('mdoe') ? localStorage.getItem('mode')! : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
//   cart: {
//     cartItems: localStorage.getItem('cartItems')
//       ? JSON.parse(localStorage.getItem('cartItems')!)
//       : [],
//     shippingAddress: localStorage.getItem('shippingAddress')
//       ? JSON.parse(localStorage.getItem('shippingAddress')!)
//       : [],
//     paymentMethod: localStorage.getItem('paymentMethod')
//       ? JSON.parse(localStorage.getItem('paymentMethod')!)
//       : 'PayPal',
//     itemsPrice: 0,
//     shippingPrice: 0,
//     taxPrice: 0,
//     totalPrice: 0
//   }
// }

// type Action = { type: 'SWITCH_MODE' } | { type: 'CART_ADD_ITEM', payload: CartItem };

// function reducer(state: AppState, action: Action): AppState {
//   switch(action.type) {
//     case 'SWITCH_MODE':
//       return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
//     case 'CART_ADD_ITEM':
//       const newItem = action.payload;
//       const existItem = state.cart.cartItems.find((item: CartItem) => item._id === newItem._id)
//       const cartItems = existItem
//         ? state.cart.cartItems.map((item: CartItem) => item._id === existItem._id ? newItem : item)
//         : [...state.cart.cartItems, newItem];

//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       return { ...state, cart: { ...state.cart, cartItems } };
//     default:
//       return state;
//   }
// }

// const defaultDispatch: React.Dispatch<Action> = () => initialState;

// const Store = React.createContext({
//   state: initialState,
//   dispatch: defaultDispatch
// });

// function StoreProvider(props: React.PropsWithChildren<{}>) {
//   const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>> (
//     reducer,
//     initialState
//   )
  
//   return <Store.Provider value={{ state, dispatch }} {...props} />
// }

// export { Store, StoreProvider }