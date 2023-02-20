import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Table,
  TableBody,
  Stack } from '@mui/material';
import { methodPost, methodGet } from '../services/requests';
import Context from '../context/Context';
import { RegisterForm, Navbar, ErrorMessage, UserDetailsRow } from '../components';
import TableHeadAdminManage from '../components/TableHeadAdminManage';

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
        <Container maxWidth="lg">
          <Typography sx={ { mt: 3, mb: 3 } }>Cadastrar novo usuário</Typography>
          <Stack alignItems="flex-start">
            <RegisterForm handleRegister={ registerNewSeller } direction="row" />
            <ErrorMessage />
          </Stack>
        </Container>
        <Stack sx={ { mt: 3, overflowX: 'auto', maxWidth: '100%' } }>
          <Typography sx={ { mt: 5, mb: 3 } }>Usuários cadastrados</Typography>
          <Table maxWidth="sm">
            <TableHeadAdminManage />
            <TableBody>
              { users && users.map(({ id, name, email, role }) => (<UserDetailsRow
                key={ id }
                name={ name }
                email={ email }
                role={ role }
              />))}
            </TableBody>
          </Table>
        </Stack>
      </Container>
    </>
  );
}
