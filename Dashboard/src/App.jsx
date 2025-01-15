import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./dashboard/pages/Dashboard";
import ProductList from "./dashboard/pages/ProductList";
import Selecteditems from './dashboard/pages/SelectedItems'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
          {/* Dashboard */}
          {/* <Route path="/dashboard" element={<AdminPanel />} /> */}
          <Route path="/add-product" element={<ProductList />} />
          <Route path="/" element={<Home />} />
          <Route path="/Selecteditems" element={<Selecteditems />} />

          {/* 404 Not Found */}
          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}