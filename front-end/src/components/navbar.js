import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const userFullName = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  return (
    <div>
      <nav>
        <div data-testid="customer_products__element-navbar-link-products" />
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name">
          <p>{userFullName.name}</p>
        </div>
        <div>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ () => history('/login') }
            to="/login"
          >
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
}
