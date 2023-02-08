import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function SellerOrdersCard({
  id,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  salesDate,
  status,

}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/seller/orders/${id}`);
  };

  return (
    <button
      onClick={ () => handleClick() }
      type="button"
    >
      <div
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        { id }
      </div>
      <div
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        { status}
      </div>
      <div
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        { moment(salesDate).format('DD/MM/YYYY') }
      </div>
      <div
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        {` R$ ${totalPrice && totalPrice.replace('.', ',')}` }
      </div>
      <div
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { `${deliveryAddress}, ${deliveryNumber}` }
      </div>
    </button>

  );
}

SellerOrdersCard.propTypes = {
  deliveryNumber: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  salesDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
