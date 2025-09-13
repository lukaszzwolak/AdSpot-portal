import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./adsRedux";
import usersReducer from "./usersRedux";

const store = configureStore({
  reducer: {
    ads: adsReducer,
    users: usersReducer,
  },
  devTools: true,
});

export default store;
