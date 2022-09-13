import { RootState } from "../../store"

//селектор для фильтрации
export const filterSelector = (state: RootState) => state.filter
//селектор для сортировки
export const sortSelector = (state: RootState) => state.filter.sort