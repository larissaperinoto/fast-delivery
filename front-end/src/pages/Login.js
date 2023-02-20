import React, { useContext, useEffect } from 'react';
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
import Context from '../context/Context';
import { checkEmail, checkPassword } from '../services/validations';
import { fromLoginRedirectTo } from '../services/helpers';
import { ErrorMessage } from '../components';

export default function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    setErrorMessage,
    disabled,
    setDisabled } = useContext(Context);

  const history = useNavigate();

  const validateLogin = async () => {
    const userData = await methodPost({ email, password }, '/login');

    if (userData !== 'Not found') {
      localStorage.setItem('user', JSON.stringify(userData));
      fromLoginRedirectTo(userData.role);
    } else {
      setErrorMessage('Email ou senha inválidos');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) fromLoginRedirectTo(user.role);
  }, []);

  useEffect(() => {
    if (checkEmail(email) && checkPassword(password)) {
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
        <img
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-delivery-cyber-monday-flaticons-lineal-color-flat-icons.png"
          alt="Motorcycle delivery"
        />
        <Typography
          variant="h1"
          sx={ { fontSize: 40 } }
        >
          Fast Delivery
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
        <ErrorMessage />
      </Stack>
    </Container>
  );
}
