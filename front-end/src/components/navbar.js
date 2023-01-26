import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Navbar() {
  const { totalQuantity } = useContext(Context);

  return (
    <div>
      <nav>
        <span data-testid="customer_products__element-navbar-link-products">
          { `Produtos ${totalQuantity}` }
        </span>
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div data-testid="customer_products__element-navbar-link-logout" />
      </nav>
    </div>
  );
}
