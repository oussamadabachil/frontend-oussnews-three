import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token:null},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {


    collectToken : (state, action) => {
      state.value.token =action.payload


    },
    collectData: (state, action) => {
      state.value=action.payload
    },
    
    eraseData :(state, action) => {
      state.value.token=""
    }
  },
});

export const { collectData , collectToken , eraseData } = userSlice.actions;
export default userSlice.reducer;
