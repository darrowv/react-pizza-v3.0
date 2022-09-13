import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://62a4eb3c259aba8e10efe88a.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }

    fetchPizzas();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <p>загрузка...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h1>{pizza.title}</h1>
      <h3>{pizza.price} ₽</h3>
    </div>
  );
};

export default FullPizza;
