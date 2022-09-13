import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, PizzaSliceType, SearchPizzaParams, Status } from "./types";


const initialState: PizzaSliceType = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizzas/fetchPizzas",
  async (params) => {
    const { sortProperty, sortOrder, categoryId, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62a4eb3c259aba8e10efe88a.mockapi.io/items?page=${currentPage}&limit=4&${sortProperty}&${sortOrder}&${categoryId}&${search}`
    );

    return data;
  }
);

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});


export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
