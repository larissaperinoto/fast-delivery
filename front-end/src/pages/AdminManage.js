import React, { useContext, useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Table,
  Stack } from '@mui/material';
import Context from '../context/Context';
import { RegisterForm,
  Navbar, ErrorMessage,
  UsersTableHead,
  UsersTableRow } from '../components';
import { methodDelete, methodGet, methodPost } from '../services/requests';

export default function AdminManage() {
  const { setErrorMessage } = useContext(Context);
  const [users, setUsers] = useState([]);

  const requestSellers = async () => {
    const userList = await methodGet('/users');
    setUsers(userList);
  };

  const removeUser = (userId) => {
    methodDelete(`/users/${userId}`);
    requestSellers();
  };

  useEffect(() => {
    requestSellers();
  }, []);

  const registerNewSeller = async ({ name, email, password, role }) => {
    const message = await methodPost({ name, email, password, role }, '/users');
    if (typeof message === 'string') {
      setErrorMessage(message);
    }
    requestSellers();
  };

  console.log(users);

  return (
    <>
      <Navbar />
      <Container sx={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }>
        <Stack direction="column">
          <Typography sx={ { mt: 3, mb: 3 } }>Cadastrar novo usuário</Typography>
          <RegisterForm handleRegister={ registerNewSeller } direction="column" />
          <ErrorMessage />
        </Stack>
        <Container
          maxWidth="sm"
          sx={ { mt: 3, mb: 5, overflowX: 'auto', maxWidth: '100%' } }
        >
          <Typography sx={ { mt: 5, mb: 3 } }>Usuários cadastrados</Typography>
          <Table>
            <UsersTableHead />
            <UsersTableRow users={ users } removeUser={ removeUser } />
          </Table>
        </Container>
      </Container>
    </>
  );
}
