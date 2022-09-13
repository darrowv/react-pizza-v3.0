import React, { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import qs from "qs";

import { list } from "../components/Sort";

import { Categories, PizzaBlock, Skeleton, Sort } from "../components";

import Pagination from "../Pagination";

import { useAppDispatch } from "../redux/store";
import { pizzasSelector } from "../redux/slices/pizzas/selectors";
import { filterSelector } from "../redux/slices/filter/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";
import { fetchPizzas } from "../redux/slices/pizzas/slice";
import { SearchPizzaParams } from "../redux/slices/pizzas/types";
import { FilterSliceState } from "../redux/slices/filter/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { items, status } = useSelector(pizzasSelector);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterSelector);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortProperty = `sortBy=${sort?.sortProperty}`;
    const sortOrder = `order=${sort?.sortOrder}`;
    const category = categoryId ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortProperty,
        sortOrder,
        categoryId: category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  // Если был первый рендер и изменили параметры, то вшиваем параметры в адресную строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort?.sortProperty,
        sortOrder: sort?.sortOrder,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  // Если был первый рендер, то проверяем URL-парметры и сохраняем их в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sort = list.find(
        (item) =>
          item.sortProperty === params.sortProperty &&
          item.sortOrder === params.sortOrder
      );

      const neededObj: FilterSliceState = {
        searchValue: "",
        categoryId: Number(params.categoryId),
        currentPage: Number(params.currentPage),
        sort: sort || list[0],
      };

      dispatch(setFilters(neededObj));

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы. Попробуйте повторить позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
