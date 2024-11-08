import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//InitialState
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
//Create brand action
export const createBrandAction = createAsyncThunk(
  "brands/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;
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
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Fetch brands action
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //Create brand
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.brand = action.payload;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.brand = null;
      state.error = action.payload;
    });
    //Fetch brands
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.brands = action.payload;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.brands = null;
      state.error = action.payload;
    });
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

const brandReducer = brandSlice.reducer;

export default brandReducer;
