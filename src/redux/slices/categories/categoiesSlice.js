import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

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
      formData.append("file", image);
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //Images
      const { data } = await axios.post(
        `${baseURL}/categories`,
        formData,
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
//Fetch category action
export const fetchCategoryAction = createAsyncThunk(
  "categories/fetch-single",
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Update category action
export const updateCategoryAction = createAsyncThunk(
  "categories/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { id, name, image } = payload;
      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", image);
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //Images
      const { data } = await axios.put(
        `${baseURL}/categories/update/${id}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Delete category action
export const deleteCategoryAction = createAsyncThunk(
  "categories/delete",
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${baseURL}/categories/delete/${id}`,
        config
      );
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
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = {};
      state.error = action.payload;
    });
    //Fetch category
    builder.addCase(fetchCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = {};
      state.error = action.payload;
    });
    //Update category
    builder.addCase(updateCategoryAction.pending, (state) => {
      state.loading = true;
      state.isUpdated = false;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.category = action.payload;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.category = {};
      state.error = action.payload;
    });
    //Delete category
    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.category = action.payload;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.category = {};
      state.error = action.payload;
    });
    //Reset
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = {};
    });
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.isDeleted = false;
      state.isUpdated = false;
    });
  },
});

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
