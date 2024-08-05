import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the slice
const initialState = {
    value: false,
};

// Create a slice of the Redux store
export const refreshSlice = createSlice({
    name: 'refresh',
    initialState,
    reducers: {
        // Toggle the refresh state
        refresh: (state) => {
            state.value = !state.value;
        },
    },
});

// Export the action creators
export const { refresh } = refreshSlice.actions;

// Export the reducer to be used in the store
export default refreshSlice.reducer;
