import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import "./scss/app.scss";
import Home from "./pages/Home";
import Layout from "./components/Layout";

const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<div>Идёт загрузка страницы...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
