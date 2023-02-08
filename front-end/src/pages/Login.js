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
import redirectTo from '../services/helpers';

export default function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    errorMessage,
    setErrorMessage,
    disabled,
    setDisabled } = useContext(Context);

  const history = useNavigate();

  const validateLogin = async () => {
    const userData = await methodPost({ email, password }, '/login');

    if (userData !== 'Not found') {
      localStorage.setItem('user', JSON.stringify(userData));
      redirectTo(userData.role);
    } else {
      setErrorMessage('Email ou senha inválidos');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) redirectTo(user.role);
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
        { errorMessage && <Typography align="center">{ errorMessage }</Typography> }
      </Stack>
    </Container>
  );
}
