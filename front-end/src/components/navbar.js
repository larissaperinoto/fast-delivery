import React from 'react';

export default function Navbar() {
  return (
    <div>
      <nav>
        <div data-testid="customer_products__element-navbar-link-products" />
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div data-testid="customer_products__element-navbar-link-logout" />
      </nav>
    </div>
  );
}
