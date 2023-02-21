import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  Stack,
  Container } from '@mui/material';
import { TableHeadAdminManage, UserDetailsRow } from '.';
import { methodDelete, methodGet } from '../services/requests';

export default function RegisteredUsersTable() {
  const [users, setUsers] = useState([]);

  const requestSellers = async () => {
    const message = await methodGet('/users');
    setUsers(message);
  };

  const removeUser = (userId) => {
    methodDelete(`/users/${userId}`);
    requestSellers();
  };

  useEffect(() => {
    requestSellers();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography sx={ { mt: 5, mb: 3 } }>Usuários cadastrados</Typography>
      <Stack sx={ { mt: 3, mb: 5, overflowX: 'auto', maxWidth: '100%' } }>
        <Table>
          <TableHeadAdminManage />
          <TableBody>
            { users && users.map(({ id, name, email, role }) => (<UserDetailsRow
              key={ id }
              name={ name }
              email={ email }
              role={ role }
              id={ id }
              removeUser={ removeUser }
            />))}
          </TableBody>
        </Table>
      </Stack>
    </Container>
  );
}
