import React, { useEffect, useContext } from 'react';
import {
  Button,
  TextField,
  FormControl,
  Stack,
  Container,
  Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { methodPost } from '../services/requests';
import Context from '../context/Context';
import { checkEmail, checkName, checkPassword } from '../services/validations';

export default function Register() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    name,
    setName,
    errorMessage,
    setErrorMessage,
    disabled,
    setDisabled } = useContext(Context);

  const history = useNavigate();

  useEffect(() => {
    if (checkEmail(email) && checkPassword(password) && checkName(name)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, name]);

  const registerNewUser = async () => {
    const role = 'customer';
    const user = await methodPost({ email, password, name, role }, '/users');
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      history('/customer/products');
    } else {
      setErrorMessage(message);
      localStorage.clear();
    }
  };

  return (
    <Container maxWidth="xs" sx={ { mt: 20 } }>
      <Stack direction="column" spacing={ 2 } alignItems="center">
        <FormControl>
          <Stack direction="column" spacing={ 2 }>
            <TextField
              type="text"
              placeholder="Nome"
              onChange={ ({ target }) => setName(target.value) }
              value={ name }
            />
            <TextField
              type="email"
              placeholder="Email"
              onChange={ ({ target }) => setEmail(target.value) }
              value={ email }
            />
            <TextField
              type="password"
              placeholder="Senha"
              onChange={ ({ target }) => setPassword(target.value) }
              value={ password }
            />
            <Button
              type="button"
              variant="contained"
              disabled={ disabled }
              onClick={ () => registerNewUser() }
            >
              Cadastrar
            </Button>
            { errorMessage && <Typography>{ errorMessage }</Typography>}
          </Stack>
        </FormControl>
      </Stack>
    </Container>
  );
}
