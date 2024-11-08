import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//InitialState
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//Add product to cat
export const addOrderToCart = createAsyncThunk(
  "cart/add-to-cart",
  ({ cartItem }, { rejectWithValue, dispatch }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    //Push to storage
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);
//Add product to cat
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  (payload, { rejectWithValue, dispatch }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    return cartItems;
  }
);

const cartSlice = createSlice({
  name: "carts",
  initialState,
  extraReducers: (builder) => {
    //Add order to cart
    builder.addCase(addOrderToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.cartItems = action.payload;
    });
    builder.addCase(addOrderToCart.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.cartItems = [];
      state.error = action.payload;
    });
    //Fetch cart items
    builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.cartItems = action.payload;
      }
    );
    builder.addCase(
      getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.isAdded = false;
        state.cartItems = [];
        state.error = action.payload;
      }
    );
    //reset
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.loading = false;
      state.isAdded = false;
    });
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
