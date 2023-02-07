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
    <Stack
      direction="row"
      spacing={ 15 }
      alignItems="center"
      justifyContent="center"
      sx={ { mt: 2 } }
    >
      <Typography
        data-testid="customer_products__element-navbar-user-full-name"
        variant="h5"
      >
        { name }
      </Typography>
      <Button
        type="button"
        variant="text"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => redirectTo(role) }
      >
        Meus Pedidos
      </Button>
      <Typography
        data-testid="customer_products__element-navbar-link-products"
        variant="h5"
      >
        { `Produtos ${totalQuantity}` }
      </Typography>
      <Button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        variant="text"
        onClick={ () => logout() }
        to="/login"
      >
        Sair
      </Button>
    </Stack>
  );
}
