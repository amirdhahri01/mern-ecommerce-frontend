import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productsSlice";
import categoryReducer from "../slices/categories/categoiesSlice";
import brandReducer from "../slices/brands/brandsSlice";
import colorReducer from "../slices/colors/colorsSlice";
import cartReducer from "../slices/Carts/cartsSlice";
import couponReducer from "../slices/coupons/couponsSlice";

//Store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
    carts: cartReducer,
    coupons: couponReducer
  },
});

export default store;
