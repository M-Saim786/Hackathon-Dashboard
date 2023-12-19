import { configureStore } from "@reduxjs/toolkit";
import { ValueSlice,  } from "./reducers/Reducer";

export const store = configureStore({
  reducer: {
    counter: ValueSlice.reducer,
  },
});
