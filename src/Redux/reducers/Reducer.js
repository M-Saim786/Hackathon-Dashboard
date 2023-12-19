import { createSlice } from "@reduxjs/toolkit";
import { Increment, getAllProduct } from "../actions";
// s

export const ValueSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    loading: false,
    error: null,
    products:[]
  },
  extraReducers: (builder) => {
    builder
      .addCase(Increment.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request is pending
      })
      .addCase(Increment.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        state.error = null; // Reset error when request is fulfilled successfully
      })
      .addCase(Increment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set the error message if the request is rejected
      })
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when a new request is pending
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;

        // Reset error when request is fulfilled successfully
        console.log(action.payload)
      }
      )
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set the error message if the request is rejected
      })

  },
});

export default ValueSlice.reducer;
