import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "typescript/interfaces/UserSlice.interfaces";
import { RootState } from "./store";

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
