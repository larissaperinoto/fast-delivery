import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function Navbar() {
  const { totalQuantity } = useContext(Context);
  const userFullName = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  return (
    <div>
      <nav>
        <span data-testid="customer_products__element-navbar-link-products">
          { `Produtos ${totalQuantity}` }
        </span>
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
