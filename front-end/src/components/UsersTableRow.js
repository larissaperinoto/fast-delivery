import { TableBody, TableCell, TableRow, Button } from '@mui/material';
import { string, number, Function, objectOf } from 'prop-types';
import React from 'react';

export default function UsersTableRow({ users, removeUser }) {
  return (
    <TableBody>
      { users && users.map(({ id, name, email, role }) => (
        <TableRow key={ id }>
          <TableCell>{ name }</TableCell>
          <TableCell>{ email }</TableCell>
          <TableCell>{ role }</TableCell>
          <TableCell>
            <Button
              type="submit"
              onClick={ () => removeUser(id) }
            >
              Excluir
            </Button>
          </TableCell>
        </TableRow>))}
    </TableBody>
  );
}

UsersTableRow.propTypes = {
  users: objectOf({
    name: string,
    email: string,
    role: string,
    id: number,
  }),
  removeUser: Function,
}.isRequired;
