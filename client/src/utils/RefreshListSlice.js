import { createSlice } from "@reduxjs/toolkit";

const RefreshListSlice = createSlice({
  name: "refreshList",
  initialState: false,
  reducers: {
    refreshTrue: (state) => true,
    refreshFalse: (state) => false,
  },
});

export const { refreshTrue, refreshFalse } = RefreshListSlice.actions;
export default RefreshListSlice.reducer;
