import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  authanticated: boolean;
  isAdmin: boolean;
};

const initialState: AuthState = {
  authanticated: false,
  isAdmin: localStorage.getItem("isAdmin") === "true",
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthState>) => {
      state.authanticated = action.payload.authanticated;
      state.isAdmin = action.payload.isAdmin;
      console.log("is admin from state management", action.payload.isAdmin);
      localStorage.setItem("isAdmin", action.payload.isAdmin + "");
    },
  },
});

export default authSlice.reducer;

export const { setAuthentication } = authSlice.actions;
