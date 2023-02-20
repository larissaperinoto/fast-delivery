import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  Container,

  Stack } from '@mui/material';
import { methodPost, methodGet } from '../services/requests';
import Context from '../context/Context';
import { RegisterForm, Navbar, ErrorMessage } from '../components';
import RegisteredUsersTable from '../components/RegisteredUsersTable';

export default function AdminManage() {
  const { setErrorMessage } = useContext(Context);
  const [users, setUsers] = useState([]);

  const registerNewSeller = async ({ name, email, password, role }) => {
    const message = await methodPost({ name, email, password, role }, '/seller');
    setErrorMessage(message);
  };

  useEffect(() => {
    const requestSellers = async () => {
      const message = await methodGet('/users');
      setUsers(message);
    };
    requestSellers();
  }, []);

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
          <RegisteredUsersTable users={ users } />
        </Stack>
      </Container>
    </>
  );
}
