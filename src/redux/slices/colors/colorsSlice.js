import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//InitialState
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
//Create colors action
export const createColorAction = createAsyncThunk(
  "colors/create",
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
        `${baseURL}/colors`,
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
//Fetch colors action
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //Create colors
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.color = action.payload;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.color = null;
      state.error = action.payload;
    });
    //Fetch colorss
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.colors = action.payload;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.colors = null;
      state.error = action.payload;
    });
    //reset
    builder.addCase(resetSuccessAction.pending , (state , action)=>{
      state.loading = false;
    })
    builder.addCase(resetErrAction.pending , (state , action)=>{
      state.error = null;
    })
  },
});

const colorReducer = colorSlice.reducer;

export default colorReducer;
