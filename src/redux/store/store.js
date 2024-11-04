import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/product/productSlice";

//Store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
  },
});

export default store;
