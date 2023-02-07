import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CustomerOrdersCard({
  id,
  totalPrice,
  saleDate,
  status,
}) {
  const history = useNavigate();

  return (
    <Stack
      type="button"
      direction="row"
      justifyContent="space-around"
      sx={ { border: 1, cursor: 'pointer', padding: 2, m: 1 } }
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
        { `R$ ${totalPrice.toString().replace(/\./, ',')}` }
      </div>
    </Stack>
  );
}

CustomerOrdersCard.propTypes = {
  deliveryNumber: PropTypes.number,
  id: PropTypes.number,
  totalPrice: PropTypes.number,
  salesDate: PropTypes.string,
  status: PropTypes.string,
}.isRequired;
