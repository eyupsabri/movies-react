import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  authanticated: boolean;
  isAdmin: boolean;
};

const initialState: AuthState = {
  authanticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthState>) => {
      state.authanticated = action.payload.authanticated;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export default authSlice.reducer;

export const { setAuthentication } = authSlice.actions;
