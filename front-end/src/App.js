import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/registro';
import Checkout from './pages/checkout';
import SellerOrder from './pages/sellerOrder';
import AdminManage from './pages/AdminManage';

function App() {
  return (
    <Routes>
      <Route path="/admin/manage" element={ <AdminManage /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/seller/orders" element={ <SellerOrder /> } />
    </Routes>
  );
}

export default App;
