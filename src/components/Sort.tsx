import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sortSelector } from "../redux/slices/filter/selectors";
import { setSortType } from "../redux/slices/filter/slice";
import { SortOrderEnum, SortPropertyEnum } from "../redux/slices/filter/types";
import { useAppDispatch } from "../redux/store";

type ListItem = {
  name: string,
  sortProperty: SortPropertyEnum ,
  sortOrder: SortOrderEnum,
}

export const list: ListItem[] = [
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING, sortOrder: SortOrderEnum.DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING, sortOrder: SortOrderEnum.ASC },
  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE, sortOrder: SortOrderEnum.DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE, sortOrder: SortOrderEnum.ASC },
  { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE, sortOrder: SortOrderEnum.DESC },
  { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE, sortOrder: SortOrderEnum.ASC },
];

const Sort: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const sort = useSelector(sortSelector);

  const [popupOpened, setPopupOpened] = useState(false);

  const sortName = sort?.name;

  const toggleSortId = (sortType: ListItem) => {
    dispatch(setSortType(sortType));
    setPopupOpened(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setPopupOpened(!popupOpened)}>{sortName}</span>
      </div>
      {popupOpened && (
        <>
          <div
            className="popup__overlay"
            onClick={() => setPopupOpened(!popupOpened)}
          ></div>
          <div className="sort__popup">
            <ul>
              {list.map((item, index) => (
                <li
                  key={index}
                  onClick={() => toggleSortId(item)}
                  className={sort?.name === item.name ? "active" : ""}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
});

export default Sort;
