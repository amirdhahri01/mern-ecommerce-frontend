import axios from "axios";
import baseURL from "../../../utils/baseURL";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//InitialState
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};
//Create category action
export const createCategoryAction = createAsyncThunk(
  "categories/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, image } = payload;
      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": ""
        },
      };
      //Images
      const { data } = await axios.post(
        `${baseURL}/categories`,
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
//Fetch categories action
export const fetchCategoriesAction = createAsyncThunk(
  "categories/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    //Create category
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = true;
      state.isAdded = true;
      state.category = action.payload;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.category = null;
      state.error = action.payload;
    });
    //Fetch categories
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = true;
      state.isAdded = true;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.categories = null;
      state.error = action.payload;
    });
  },
});

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
