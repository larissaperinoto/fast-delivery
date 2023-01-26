import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/registro';
import Checkout from './pages/checkout';
import DeliveryProvider from './context/DeliveryProvider';

function App() {
  return (
    <DeliveryProvider>
      <Routes>
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
      </Routes>
    </DeliveryProvider>
  );
}

export default App;
