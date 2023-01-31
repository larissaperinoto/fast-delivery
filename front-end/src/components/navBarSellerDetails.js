import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavBarSellerDetails() {
  return (
    <nav>
      <div
        data-testid="customer_products__element-navbar-link-orders"
      >
        <Link to="/seller/orders">
          Pedidos
        </Link>
      </div>
      <div
        data-testid="customer_products__element-navbar-user-full-name"
      >
        <p>
          { name }
        </p>
      </div>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        <Link to="/login">
          Sair
        </Link>
      </button>
    </nav>
  );
}

SellerNav.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default NavBarSellerDetails;
