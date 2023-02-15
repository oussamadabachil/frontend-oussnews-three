import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false   
};

export const animationSlice = createSlice({
    name: 'animation',
    initialState,
    reducers: {
        setAnimation: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAnimation } = animationSlice.actions;
export default animationSlice.reducer;
