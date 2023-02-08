import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Login,
  Register,
  AdminManage,
  OrderOrSaleDetails,
  Products,
  Checkout,
  OrdersOrSales,
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/customer/orders/:id" element={ <OrderOrSaleDetails /> } />
      <Route path="/seller/orders/:id" element={ <OrderOrSaleDetails /> } />
      <Route path="/admin/manage" element={ <AdminManage /> } />
      <Route path="/seller/orders" element={ <OrdersOrSales /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/orders" element={ <OrdersOrSales /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
