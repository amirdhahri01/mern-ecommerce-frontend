import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";

//Store
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
