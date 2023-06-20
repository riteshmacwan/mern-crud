import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./utils/counterSlice";
import RefreshListSlice from "./utils/RefreshListSlice";
import DetailsSlice from "./utils/DetailsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    refreshList: RefreshListSlice,
    details: DetailsSlice,
  },
});
