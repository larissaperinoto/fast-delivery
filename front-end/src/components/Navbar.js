import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AllOrdersButton from './AllOrdersButton';

export default function Navbar() {
  const { name } = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();
  const route = window.location.pathname;

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
        { !route.includes('costumer') && <AllOrdersButton /> }
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
