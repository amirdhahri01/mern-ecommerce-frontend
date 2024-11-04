import axios from "axios";
import baseURL from "../../../utils/baseURL";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//InitialState
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
//Create product action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, description, category, sizes, brand, colors, price } =
        payload;
      //Make request
      //Token - Authenticated
      //Images
      const { data } = await axios.post(`${baseURL}/products`, {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
      });
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //Create product
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = true;
      state.isAdded = true;
      state.product = action.payload;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.product = null;
      state.error = action.payload;
    });
  },
});

const productReducer = productSlice.reducer();

export default productReducer;
