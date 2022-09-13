export type Pizza = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceType {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  sortProperty: string;
  sortOrder: string;
  categoryId: string;
  search: string;
  currentPage: string;
};