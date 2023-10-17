import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, ShippingAddress } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';

const emptyCart: Cart = {
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

const initialState: Cart = {
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
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (cartItem: CartItem) =>
          cartItem._id === newItem._id &&
          cartItem.colorSelected === newItem.colorSelected &&
          cartItem.sizeSelected === newItem.sizeSelected
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id &&
          cartItem.colorSelected === existItem.colorSelected &&
          cartItem.sizeSelected === existItem.sizeSelected
            ? { ...cartItem, quantity: newItem.quantity }
            : cartItem
        );
      } else {
        state.cartItems.push(newItem);
      }
      
      setLocalStorage('cartItems', state.cartItems);
    },
    removeItemFromCart: (state, action: PayloadAction<CartItem>) => {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) =>
          cartItem._id !== itemToRemove._id ||
          cartItem.colorSelected !== itemToRemove.colorSelected ||
          cartItem.sizeSelected !== itemToRemove.sizeSelected
      );
      setLocalStorage('cartItems', state.cartItems);
    },
    clearCart: (state) => state = emptyCart,
    clearCartItems: (state) => {
      state.cartItems = [];
      setLocalStorage('cartItems', []);
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      setLocalStorage('shippingAddress', action.payload);
    },
    savePaymentMethod: (state, action: PayloadAction<'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe'>) => {
      state.paymentMethod = action.payload;
      setLocalStorage('paymentMethod', action.payload);
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, clearCartItems, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice;
