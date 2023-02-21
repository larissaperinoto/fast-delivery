import React, { useContext } from 'react';
import {
  Typography,
  Container,

  Stack } from '@mui/material';
import { methodPost } from '../services/requests';
import Context from '../context/Context';
import { RegisterForm, Navbar, ErrorMessage } from '../components';
import RegisteredUsersTable from '../components/RegisteredUsersTable';

export default function AdminManage() {
  const { setErrorMessage } = useContext(Context);

  const registerNewSeller = async ({ name, email, password, role }) => {
    const message = await methodPost({ name, email, password, role }, '/seller');
    setErrorMessage(message);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Stack direction="row" display="flex" flexWrap="wrap" justifyContent="center">
          <Stack direction="column">
            <Typography sx={ { mt: 3, mb: 3 } }>Cadastrar novo usuário</Typography>
            <RegisterForm handleRegister={ registerNewSeller } direction="column" />
            <ErrorMessage />
          </Stack>
          <RegisteredUsersTable />
        </Stack>
      </Container>
    </>
  );
}
