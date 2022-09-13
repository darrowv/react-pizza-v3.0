import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce"
import { useRef, useCallback, useState } from "react";

import styles from "./Search.module.scss";
import { setSearchValue } from "../../redux/slices/filter/slice";

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    setValue("")
    dispatch(setSearchValue(""))
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value )
  }

  return (
    <div className={styles.root}>
      <span className={`material-symbols-outlined ${styles.icon}`}>search</span>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={(e) => onChangeInput(e)}
      />
      {value && (
        <span
          onClick={onClickClear}
          className={`material-symbols-outlined ${styles.clearIcon}`}
        >
          close
        </span>
      )}
    </div>
  );
};

export default Search;
