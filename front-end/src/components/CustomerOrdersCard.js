import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CustomerOrdersCard({
  id,
  totalPrice,
  deliveryNumber,
  saleDate,  
  status,
}) {
  const history = useNavigate();

  return (
    <button
      type="button"
      onClick={ () => history(`/customer/orders/${id}`) }
    >
      <div
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { `00${id}` }
      </div>
      <div
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </div>
      <div
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { saleDate }
      </div>
      <div
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { totalPrice.toString().replace(/\./, ',') }
      </div>
    </button>
  );
}

CustomerOrdersCard.propTypes = {
  deliveryNumber: PropTypes.number,
  id: PropTypes.number,
  totalPrice: PropTypes.number,
  salesDate: PropTypes.string,
  status: PropTypes.string,
}.isRequired;
