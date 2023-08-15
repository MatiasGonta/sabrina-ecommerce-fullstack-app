import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';

const initialState: Product[] = getLocalStorage('favoriteProducts')
    ? JSON.parse(getLocalStorage('favoriteProducts')!)
    : [];

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addProductToFavorites: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
            setLocalStorage('favoriteProducts', state);
        },
        removeProductFromFavorites: (state, action: PayloadAction<Product>) => {
            const newState = state.filter(product => product._id !== action.payload._id);
            setLocalStorage('favoriteProducts', newState);
            state = newState;
            return state;
        },
    },
});

export const { addProductToFavorites, removeProductFromFavorites } = favoritesSlice.actions;

export default favoritesSlice;
