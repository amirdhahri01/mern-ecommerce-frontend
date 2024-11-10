import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//InitialState
const initialState = {
  coupons: [],
  coupon: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
//Create coupon action
export const createCouponAction = createAsyncThunk(
  "coupons/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { code, startDate, endDate, discount } = payload;
      //Make request
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Images
      const { data } = await axios.post(
        `${baseURL}/coupons`,
        {
          code,
          startDate,
          endDate,
          discount,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Fetch coupons action
export const fetchCouponsAction = createAsyncThunk(
  "coupons/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/coupons`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Fetch coupons action
export const fetchCouponAction = createAsyncThunk(
  "coupons/fetch-single",
  async ({ code }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/coupons/single?code=${code}`,
        { code }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Update coupon action
export const updateCouponAction = createAsyncThunk(
  "coupons/update-coupon",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id, code, startDate, endDate, discount } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/coupons/update/${id}`,
        { code, startDate, endDate, discount },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Delete coupon action
export const deleteCouponAction = createAsyncThunk(
  "coupons/delete-coupon",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${baseURL}/coupons/delete/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers: (builder) => {
    //Create coupon
    builder.addCase(createCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.coupon = action.payload;
    });
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.coupon = {};
      state.error = action.payload;
    });
    //Fetch coupons
    builder.addCase(fetchCouponsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload;
    });
    builder.addCase(fetchCouponsAction.rejected, (state, action) => {
      state.loading = false;
      state.coupons = [];
      state.error = action.payload;
    });
    //Fetch single coupon
    builder.addCase(fetchCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
    });
    builder.addCase(fetchCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = {};
      state.error = action.payload;
    });
    //Update coupon
    builder.addCase(updateCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.coupon = action.payload;
    });
    builder.addCase(updateCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.coupon = {};
      state.error = action.payload;
    });
    //Delete coupon
    builder.addCase(deleteCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.coupon = action.payload;
    });
    builder.addCase(deleteCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.coupon = {};
      state.error = action.payload;
    });
    //reset
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
  },
});

const couponReducer = couponSlice.reducer;

export default couponReducer;
