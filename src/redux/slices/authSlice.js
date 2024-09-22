import { createSlice } from "@reduxjs/toolkit";

const savedData = localStorage.getItem("userInfo");
const initialState = {
  userInfo: savedData ? JSON.parse(savedData) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
