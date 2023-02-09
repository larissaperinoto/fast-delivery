import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function OrderOrSaleCard({
  id,
  totalPrice,
  saleDate,
  status,
  deliveryAddress,
  deliveryNumber,
}) {
  const history = useNavigate();
  const minOrderNumber = 3;

  const rediretToDetails = () => {
    if (window.location.pathname.includes('seller')) {
      history(`/seller/orders/${id}`);
    } else {
      history(`/customer/orders/${id}`);
    }
  };

  return (
    <Stack
      type="button"
      direction="row"
      justifyContent="space-around"
      sx={ { border: 1, cursor: 'pointer', padding: 2, m: 1 } }
      onClick={ () => rediretToDetails() }
    >
      <Typography>{ id.toString().padStart(minOrderNumber, 0) }</Typography>
      <Typography>{ status }</Typography>
      <Typography>{ moment(saleDate).format('DD/MM/YYYY') }</Typography>
      <Typography>{ `R$ ${totalPrice.toString().replace('.', ',')}` }</Typography>
      { window.location.pathname.includes('seller')
        && <Typography>{ `${deliveryAddress}, ${deliveryNumber}` }</Typography> }
    </Stack>
  );
}

OrderOrSaleCard.propTypes = {
  deliveryNumber: PropTypes.number,
  id: PropTypes.number,
  totalPrice: PropTypes.number,
  saleDate: PropTypes.string,
  status: PropTypes.string,
  deliveryAddress: PropTypes.string,
}.isRequired;
