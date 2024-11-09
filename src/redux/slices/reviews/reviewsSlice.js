import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//InitialState
const initialState = {
  reviews: [],
  review: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
//Create review action
export const createReviewAction = createAsyncThunk(
  "reviews/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { rating, message, id } = payload;
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
        `${baseURL}/reviews/${id}`,
        {
          rating,
          message,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    //Create review
    builder.addCase(createReviewAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.review = action.payload;
    });
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.review = {};
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

const reviewReducer = reviewSlice.reducer;

export default reviewReducer;
