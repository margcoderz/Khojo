import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../Store/Store';

export type LoginData = {
  email: string;
  password: string;
  isLogin: boolean;
};

const initialState: LoginData = {
  email: 'kamal1@gmail.com',
  password: '12345',
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<LoginData>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLogin = true;
    },
    // Optional: Add a reset action if needed
    logout: state => {
      state.email = '';
      state.password = '';
      state.isLogin = false;
    },
  },
});

export const {setLogin, logout} = loginSlice.actions;

// Selector to get login data from the state
export const getLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
