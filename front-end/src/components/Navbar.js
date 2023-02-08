import React, { useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function Navbar() {
  const { totalQuantity } = useContext(Context);
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
    <>
      <Stack
        direction="row"
        spacing={ 15 }
        alignItems="center"
        justifyContent="flex-end"
        sx={ { mt: 2 } }
      >
        <Button
          type="button"
          variant="text"
          onClick={ () => redirectTo(role) }
        >
          Meus Pedidos
        </Button>
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
      <Typography variant="body1">
        { `Produtos selecionados ${totalQuantity}` }
      </Typography>
    </>
  );
}
