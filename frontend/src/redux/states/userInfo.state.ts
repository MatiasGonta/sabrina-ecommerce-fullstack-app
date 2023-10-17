import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models';
import { getLocalStorage } from '@/utilities';

const initialState: User | null = getLocalStorage('userInfo')
  ? JSON.parse(getLocalStorage('userInfo')!)
  : null;

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
      userSignin: (state, action: PayloadAction<User>) => action.payload,
    },
});

export const { userSignin } = userInfoSlice.actions;

export default userInfoSlice;