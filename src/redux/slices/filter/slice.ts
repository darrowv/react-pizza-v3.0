import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortOrderEnum, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности (DESC)",
    sortProperty: SortPropertyEnum.RATING,
    sortOrder: SortOrderEnum.DESC ,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = action.payload.categoryId
      state.currentPage = action.payload.currentPage
      state.sort = action.payload.sort
    }
  },
});



export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
