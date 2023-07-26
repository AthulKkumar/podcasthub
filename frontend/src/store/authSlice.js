import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: "",
    hash: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // To set user and isAuth when the user enters the right otp
    setAuth: (state, action) => {
      const { user } = action.payload;

      state.user = user;
      state.isAuth = !!user; // this is the bug fix
    },

    // This is to set the phone and the hash value
    setOtp: (state, action) => {
      const { phone, hash } = action.payload;

      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
