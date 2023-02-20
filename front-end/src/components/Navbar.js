import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fromNavBarRedirectTo } from '../services/helpers';

export default function Navbar() {
  const { name, role } = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();
  const route = window.location.pathname;

  const logout = () => {
    localStorage.clear();
    history('/login');
  };

  const newOrderButton = () => {
    if (route.includes('costumer/orders')) {
      return (
        <Button
          type="button"
          variant="text"
          color="secondary"
          size="small"
          onClick={ () => history('customer/products') }
        >
          Novo Pedido
        </Button>
      );
    }
  };

  const myOrdersButton = () => {
    if (!route.includes('admin')) {
      return (
        <Button
          type="button"
          variant="text"
          color="secondary"
          size="small"
          onClick={ () => fromNavBarRedirectTo(role) }
        >
          Meus Pedidos
        </Button>
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={ { mt: 5, mb: 5 } }>
      <Stack
        direction="row"
        spacing={ 5 }
        alignItems="center"
        justifyContent="flex-end"
        sx={ { mb: 2 } }
      >
        { newOrderButton() }
        { myOrdersButton() }
        <Button
          type="button"
          variant="text"
          color="secondary"
          onClick={ () => logout() }
        >
          Sair
        </Button>
      </Stack>
      <Typography variant="h5">{ `Olá, ${name}` }</Typography>
    </Container>
  );
}
