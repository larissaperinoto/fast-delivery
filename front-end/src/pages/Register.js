import React, { useContext } from 'react';
import { Stack, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { methodPost } from '../services/requests';
import Context from '../context/Context';
import RegisterForm from '../components/RegisterForm';
import ErrorMessage from '../components/ErrorMessage';

export default function Register() {
  const { setErrorMessage } = useContext(Context);

  const history = useNavigate();

  const registerNewUser = async ({ name, email, password, role = 'customer' }) => {
    const message = await methodPost({ email, password, name, role }, '/users');
    if (message.token) {
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
        <Typography variant="h4">Cadastra-se</Typography>
        <RegisterForm handleRegister={ registerNewUser } />
      </Stack>
      <ErrorMessage />
    </Container>
  );
}
