import { Cart, CartItem } from '@/models';
import React, { createContext, useState } from 'react';


interface ThemeContextInterface {
  mode: string;
  cart: Cart;
  addItemToCart: (item: CartItem) => void;
  removeItemToCart: (item: CartItem) => void;
  updateMode: (newMode: string) => void;
}

interface ThemeProviderInterface {
  children: React.ReactNode;
}


const initialState: Cart = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')!)
    : [],
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod')!)
    : 'PayPal',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0
};

export const ThemeContext = createContext<ThemeContextInterface>({
  mode: '',
  cart: initialState,
  addItemToCart: () => {},
  removeItemToCart: () => {},
  updateMode: () => {}
});

export const ThemeProvider: React.FC<ThemeProviderInterface> = ({ children }) => {
  const storage = localStorage.getItem('mode');
  const initialMode = storage || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [mode, setMode] = useState<string>(initialMode);
  const [cart, setCart] = useState<Cart>(initialState);

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

  const themeContextValue: ThemeContextInterface = {
    mode,
    cart,
    addItemToCart,
    removeItemToCart,
    updateMode
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