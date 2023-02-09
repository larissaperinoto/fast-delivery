import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  FormControl,
  Stack } from '@mui/material';
import Context from '../context/Context';
import { checkEmail, checkName, checkPassword } from '../services/validations';
import SelectRole from './SelectRole';

export default function RegisterForm({ handleRegister, direction }) {
  const route = window.location.pathname;

  const {
    email,
    password,
    setEmail,
    setPassword,
    name,
    setName,
    role,
    disabled,
    setDisabled } = useContext(Context);

  useEffect(() => {
    if (checkEmail(email) && checkPassword(password) && checkName(name)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, name]);

  return (
    <FormControl>
      <Stack direction={ direction } spacing={ 2 }>
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
        { route.includes('admin') && <SelectRole /> }
        <Button
          type="button"
          variant="contained"
          disabled={ disabled }
          onClick={ () => handleRegister({ name, email, password, role }) }
        >
          Cadastrar
        </Button>
      </Stack>
    </FormControl>
  );
}

RegisterForm.propTypes = {
  direction: PropTypes.string,
  handleRegister: PropTypes.Function,
}.isRequired;
