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

//Add product to cart
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
//Get cart items from localStorage
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  (payload, { rejectWithValue, dispatch }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    return cartItems;
  }
);
//Change order item quantity
export const changeOrderItemQty = createAsyncThunk(
  "cart/change-item-qty",
  ({ productID, qty }, { rejectWithValue, dispatch }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newCartItems = cartItems.map((item) => {
      if (item?._id.toString() === productID?.toString()) {
        const newPrice = item?.price * qty;
        item.qty = qty;
        item.totalPrice = newPrice;
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    return cartItems;
  }
);
//Remove item from cart
export const removeOrderItemAction = createAsyncThunk(
  "cart/remove-order-item",
  ({ productID }, { rejectWithValue, dispatch }) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newItems = cartItems.filter((item) => item._id !== productID);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
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
