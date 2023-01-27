import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SellerOrdersCard({
  id,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  salesDate,
  status,

}) {
  const history = useNavigate();

  return (
    <button
      type="button"
      onClick={ () => history(`/seller/orders/${id}`) }
    >
      <div
        data-testid={ `seller_orders__element-order-id-${id}` }
      />
      { deliveryNumber }
      <div
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      />
      { status }
      <div
        data-testid={ `seller_orders__element-order-date-${id}` }
      />
      { salesDate }
      <div
        data-testid={ `seller_orders__element-card-price-${id}` }
      />
      { totalPrice }
      <div
        data-testid={ `seller_orders__element-card-address-${id}` }
      />
      { deliveryAddress }
    </button>
  );
}

SellerOrdersCard.propTypes = {
  deliveryNumber: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  salesDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
