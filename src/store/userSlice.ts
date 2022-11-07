import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IUser {
  uid: string | null;
  email: string | null;
  name: string | null;
  admin?: boolean;
  phone?: string | null;
  photo?: string | null;
}

interface InitialState {
  user: IUser | null;
}

const initialState: InitialState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<InitialState>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
