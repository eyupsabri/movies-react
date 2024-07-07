import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertAction = {
  type: "button" | "default";
  message: string;
};

type AlertState = {
  showAlert: boolean;
  message: string;
  type: "button" | "default";
};

const initialState: AlertState = {
  showAlert: false,
  message: "",
  type: "default",
};

const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertAction>) => {
      state.showAlert = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    dissmissAlert: (state) => {
      state.showAlert = false;
    },
  },
});

export default alertSlice.reducer;

export const { setAlert, dissmissAlert } = alertSlice.actions;
