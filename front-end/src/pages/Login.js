import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, Stack, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../services/requests';

export default function Login() {
  const [invalidEmail, setInvalidEmail] = useState(false);
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
    const userData = await postLogin(email, password);

    if (userData !== 'Not found') {
      localStorage.setItem('user', JSON.stringify(userData));
      redirectTo(userData.role);
    } else {
      setInvalidEmail(!invalidEmail);
      setErrorMessage('Email não encontrado');
    }
  };

  useEffect(() => {
    // localStorage.removeItem('user');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      redirectTo(user.role);
    }
  }, []);

  const checkPassword = () => {
    const minPasswordCharacters = 6;
    return password.length >= minPasswordCharacters;
  };
  const checkEmail = () => {
    const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email.match(validEmail);
  };

  useEffect(() => {
    if (checkEmail() && checkPassword()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <Container maxWidth="md" sx={ { mt: 20 } }>
      <FormControl onSubmit={ (e) => e.preventDefault() }>
        <Stack direction="column" spacing={ 2 }>
          <TextField
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            htmlFor="common_login__input-email"
            type="email"
            placeholder="Email"
            data-testid="common_login__input-email"
          />
          {
            invalidEmail && (
              <p data-testid="common_login__element-invalid-email">
                { errorMessage }
              </p>
            )
          }
          <TextField
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            htmlFor="common_login__input-password"
            type="password"
            placeholder="Senha"
            data-testid="common_login__input-password"
          />
          <Button
            variant="contained"
            type="submit"
            data-testid="common_login__button-login"
            onClick={ () => validateLogin() }
            disabled={ disabled }
          >
            Login
          </Button>
          <Link to="/register">
            <Button
              variant="text"
              type="button"
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </Button>
          </Link>
        </Stack>
      </FormControl>
    </Container>
  );
}
