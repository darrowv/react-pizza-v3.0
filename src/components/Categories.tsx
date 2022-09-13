import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <div className="categories-list">
        <ul>
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickCategory(index)}
                className={value === index ? "active" : ""}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
})

export default Categories;
