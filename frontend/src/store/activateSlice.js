import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
};

export const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    // Set up the name which entered by the user
    setName: (state, action) => {
      state.name = action.payload;
    },
    // Set up the image of user
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setAvatar } = activateSlice.actions;

export default activateSlice.reducer;
