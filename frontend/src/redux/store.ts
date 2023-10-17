import { configureStore } from '@reduxjs/toolkit';
import { Cart, Product, User } from '@/models';
import { userInfoSlice, cartSlice, favoritesSlice } from './states';


export interface AppStore {
  userInfo: User | null;
  cart: Cart;
  favorites: Product[];
}

export default configureStore<AppStore>({
  reducer: {
    userInfo: userInfoSlice.reducer,
    cart: cartSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});