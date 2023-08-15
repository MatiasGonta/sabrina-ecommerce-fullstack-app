import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/models';
import { getLocalStorage } from '@/utilities';

const initialState: UserInfo | null = getLocalStorage('userInfo')
  ? JSON.parse(getLocalStorage('userInfo')!)
  : null;

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
      userSignin: (state, action: PayloadAction<UserInfo>) => action.payload,
    },
});

export const { userSignin } = userInfoSlice.actions;

export default userInfoSlice;