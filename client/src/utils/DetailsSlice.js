import { createSlice } from "@reduxjs/toolkit";

const DetailsSlice = createSlice({
  name: "details",
  initialState: {},
  reducers: {
    addDetails: (state, actions) => actions.payload,
    removeDetails: (state) => {},
  },
});

export const { addDetails, removeDetails } = DetailsSlice.actions;
export default DetailsSlice.reducer;
