import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  authanticated: boolean;
};

const initialState: AuthState = {
  authanticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthState>) => {
      state.authanticated = action.payload.authanticated;
    },
  },
});

export default authSlice.reducer;

export const { setAuthentication } = authSlice.actions;
