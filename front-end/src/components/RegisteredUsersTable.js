import React from 'react';
import { array } from 'prop-types';
import {
  Typography,
  Table,
  TableBody,
  Stack,
  Container } from '@mui/material';
import { TableHeadAdminManage, UserDetailsRow } from '.';

export default function RegisteredUsersTable({ users }) {
  return (
    <Container maxWidth="sm">
      <Typography sx={ { mt: 5, mb: 3 } }>Usuários cadastrados</Typography>
      <Stack sx={ { mt: 3, mb: 5, overflowX: 'auto', maxWidth: '100%' } }>
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
  );
}

RegisteredUsersTable.propTypes = {
  users: array,
}.isRequired;
