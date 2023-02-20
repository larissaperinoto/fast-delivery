import React from 'react';
import { Button } from '@mui/material';
import { fromNavBarRedirectTo } from '../services/helpers';

export default function AllOrdersButton() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  const route = window.location.pathname;

  return (
    <Button
      type="button"
      variant="text"
      onClick={ () => fromNavBarRedirectTo(role, route) }
    >
      { route.includes('products') ? 'Meus Pedidos' : 'Novo pedido' }
    </Button>
  );
}
