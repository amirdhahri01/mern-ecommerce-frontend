import axios from "axios";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import baseURL from "../../../utils/baseURL";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
//InitialState
const initialState = {
  orders: [],
  order: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  stats: {},
};

//Place order action
export const placeOrderAction = createAsyncThunk(
  "order/place-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { orderItems, shippingAddress, totalPrice } = payload;
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Make request
      const { data } = await axios.post(
        `${baseURL}/orders`,
        { orderItems, shippingAddress, totalPrice },
        config
      );
      return window.open(data?.url);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Fetch orders action
export const fetchOrdersAction = createAsyncThunk(
  "orders/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Fetch order action
export const fetchOrderAction = createAsyncThunk(
  "orders/details",
  async ({ orderID }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders/${orderID}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Get orders statistics
export const fetchOrdersStatisticsAction = createAsyncThunk(
  "orders/statistics",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/orders/sales/stats`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Update order action
export const updateOrderAction = createAsyncThunk(
  "order/update-order",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { status, id } = payload;
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Make request
      const { data } = await axios.put(
        `${baseURL}/orders/update/${id}`,
        { status },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    //Place order
    builder.addCase(placeOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.order = action.payload;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
    builder.addCase(placeOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.order = {};
      state.error = action.payload;
    });
    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //Fetch orders
    builder.addCase(fetchOrdersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(fetchOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.payload;
    });
    //Fetch order
    builder.addCase(fetchOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.order = action.payload;
    });
    builder.addCase(fetchOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.order = {};
      state.error = action.payload;
    });
    //Get orders sales statistics
    builder.addCase(fetchOrdersStatisticsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrdersStatisticsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(fetchOrdersStatisticsAction.rejected, (state, action) => {
      state.loading = false;
      state.stats = {};
      state.error = action.payload;
    });
    //Update order action
    builder.addCase(updateOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderAction.fulfilled, (state, action) => {
      state.loading = true;
      state.isUpdated = true;
      state.order = action.payload;
    });
    builder.addCase(updateOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = {};
      state.isUpdated = false;
      state.error = action.payload;
    });
  },
});

const orderReducer = orderSlice.reducer;

export default orderReducer;
