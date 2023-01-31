import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function Navbar() {
  const { totalQuantity } = useContext(Context);
  const { name, role } = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  const redirectTo = (userRole) => {
    switch (userRole) {
    case 'customer':
      history('/customer/orders');
      break;
    case 'seller':
      history('/seller/orders');
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <nav>
        <span data-testid="customer_products__element-navbar-link-products">
          { `Produtos ${totalQuantity}` }
        </span>
        <div>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => redirectTo(role) }
          >
            Meus Pedidos
          </button>
        </div>
        <div data-testid="customer_products__element-navbar-user-full-name">
          <p>{ name }</p>
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
