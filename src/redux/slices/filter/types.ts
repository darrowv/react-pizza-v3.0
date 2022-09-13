export enum SortPropertyEnum {
  RATING = "rating",
  TITLE = "title",
  PRICE = "price",
}

export enum SortOrderEnum {
  DESC = "desc",
  ASC = "asc"
}

export type Sort = {
  name: string,
  sortProperty: SortPropertyEnum,
  sortOrder: SortOrderEnum,
}

export interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sort: Sort
}