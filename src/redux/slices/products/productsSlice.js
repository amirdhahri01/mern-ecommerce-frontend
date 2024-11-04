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
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;
      //Make request
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("totalQty", totalQty);
      sizes.map((size) => {
        formData.append("sizes", size);
      });
      colors.map((color) => {
        formData.append("colors", color);
      });
      files.map((file) => {
        console.log(file);
        formData.append("files", file);
      });
      const { data } = await axios.post(
        `${baseURL}/products`,
        {
          name,
          description,
          category,
          sizes,
          brand,
          colors,
          price,
          totalQty,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
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
      console.log(action.payload);
    });
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
