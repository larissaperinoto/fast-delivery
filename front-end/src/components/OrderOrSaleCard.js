import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { number, string } from 'prop-types';
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
  const route = window.location.pathname;

  const rediretToDetails = () => {
    if (route.includes('seller')) {
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
      { route.includes('seller')
        && <Typography>{ `${deliveryAddress}, ${deliveryNumber}` }</Typography> }
    </Stack>
  );
}

OrderOrSaleCard.propTypes = {
  deliveryNumber: number,
  id: number,
  totalPrice: number,
  saleDate: string,
  status: string,
  deliveryAddress: string,
}.isRequired;
