import React, { useEffect, useState } from 'react';
import { Button, TextField, FormControl, Stack, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postLogin, postRegistration } from '../services/requests';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [serverMessage, setServerMessage] = useState('');

  const history = useNavigate();

  const checkFormat = () => {
    const ELEVEN = 11;
    const FIVE = 5;
    const validName = name.length > ELEVEN;
    const validEmail = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(email);
    const validPassword = password.length > FIVE;
    if (validName && validEmail && validPassword) return setDisabled(false);
    setDisabled(true);
  };

  useEffect(() => {
    checkFormat();
  }, [name, email, password]);

  const registerNewUser = async (e, body) => {
    e.preventDefault();
    const { message } = await postRegistration(body);
    if (message === 'Created') {
      const user = await postLogin(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      history('/customer/products');
    } else {
      setServerMessage(message);
      localStorage.clear();
    }
  };

  return (
    <Container maxWidth="md" sx={ { mt: 20 } }>
      <FormControl>
        <Stack direction="column" spacing={ 2 }>
          <TextField
            type="name"
            placeholder="Nome"
            data-testid="common_register__input-name"
            onChange={ ({ target }) => setName(target.value) }
            value={ name }
          />
          <TextField
            type="email"
            placeholder="Email"
            data-testid="common_register__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
          />
          <TextField
            type="password"
            placeholder="Senha"
            data-testid="common_register__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
          />
          <Button
            type="button"
            variant="contained"
            data-testid="common_register__button-register"
            disabled={ disabled }
            onClick={ () => registerNewUser({ name, email, password, role: 'customer' }) }
          >
            Cadastrar
          </Button>

          <p
            data-testid="common_register__element-invalid_register"
          >
            {serverMessage}
          </p>
        </Stack>
      </FormControl>
    </Container>
  );
}
