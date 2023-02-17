import React, { useContext } from 'react';
import { Stack, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { methodPost } from '../services/requests';
import Context from '../context/Context';
import { RegisterForm, ErrorMessage } from '../components';

export default function Register() {
  const { setErrorMessage } = useContext(Context);

  const history = useNavigate();

  const registerNewUser = async ({ name, email, password }) => {
    const message = await methodPost({
      email, password, name, role: 'customer' }, '/users');
    if (message.token) {
      localStorage.setItem('user', JSON.stringify(message));
      history('/customer/products');
    } else {
      setErrorMessage(message);
      localStorage.clear();
    }
  };

  return (
    <Container maxWidth="xs" sx={ { mt: 10, mb: 10 } }>
      <Stack direction="column" spacing={ 2 } alignItems="center">
        <Typography variant="h4">Cadastra-se</Typography>
        <RegisterForm handleRegister={ registerNewUser } />
        <Stack direction="column" width="60%" spacing={ 1 } alignItems="flex-start">
          <Typography variant="h6">Atenção ao se cadastrar</Typography>
          <Typography>- O campo Nome deve possuir 12 ou mais caracteres</Typography>
          <Typography>- Utilize um email no formato email@email.com</Typography>
          <Typography>- Crie uma senha com 6 ou mais caracteres</Typography>
        </Stack>
      </Stack>
      <ErrorMessage />
    </Container>
  );
}
