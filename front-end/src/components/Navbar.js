import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
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

  const logout = () => {
    localStorage.clear();
    history('/login');
  };

  return (
    <Container maxWidth="lg" sx={ { mt: 5, mb: 5 } }>
      <Stack
        direction="row"
        spacing={ 15 }
        alignItems="center"
        justifyContent="flex-end"
        sx={ { mb: 2 } }
      >
        { !window.location.pathname.includes('admin')
          && <Button
            type="button"
            variant="text"
            onClick={ () => redirectTo(role) }
          >
            Meus Pedidos
          </Button> }
        <Button
          type="button"
          variant="text"
          onClick={ () => logout() }
          to="/login"
        >
          Sair
        </Button>
      </Stack>
      <Typography variant="h5">{ `Olá, ${name}` }</Typography>
    </Container>
  );
}
