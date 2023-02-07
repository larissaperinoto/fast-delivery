import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  FormControl,
  Stack,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { methodPost } from '../services/requests';

export default function Login() {
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const history = useNavigate();

  const redirectTo = (role) => {
    switch (role) {
    case 'customer':
      history('/customer/products');
      break;
    case 'administrator':
      history('/admin/manage');
      break;
    case 'seller':
      history('/seller/orders');
      break;
    default:
      break;
    }
  };

  const validateLogin = async () => {
    const userData = await methodPost({ email, password }, '/login');

    if (userData !== 'Not found') {
      localStorage.setItem('user', JSON.stringify(userData));
      redirectTo(userData.role);
    } else {
      setInvalidLogin(!invalidLogin);
      setErrorMessage('Email ou senha inválidos');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) redirectTo(user.role);
  }, []);

  useEffect(() => {
    const minPasswordCharacters = 6;
    const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (password.length >= minPasswordCharacters && email.match(validEmail)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <Container
      maxWidth="xs"
      sx={ { mt: 20 } }
    >
      <Stack direction="column" spacing={ 2 } alignItems="center">
        <Typography
          variant="h1"
          sx={ { fontSize: 40 } }
        >
          Delivery App
        </Typography>
        <FormControl>
          <Stack direction="column" spacing={ 2 }>
            <TextField
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
              type="email"
              placeholder="Email"
            />
            <TextField
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
              type="password"
              placeholder="Senha"
            />
            <Button
              variant="contained"
              type="submit"
              onClick={ () => validateLogin() }
              disabled={ disabled }
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={ () => history('/register') }
            >
              Ainda não tenho conta
            </Button>
          </Stack>
        </FormControl>
        { invalidLogin
        && <Typography align="center">{ errorMessage }</Typography> }
      </Stack>
    </Container>
  );
}
