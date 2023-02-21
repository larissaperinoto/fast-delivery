import { TableCell, TableRow, Button } from '@mui/material';
import { string, number, Function } from 'prop-types';
import React from 'react';

export default function UserDetailsRow({ name, email, role, id, removeUser }) {
  return (
    <TableRow>
      <TableCell>{ name }</TableCell>
      <TableCell>{ email }</TableCell>
      <TableCell>{ role }</TableCell>
      <TableCell>
        <Button
          type="button"
          onClick={ () => removeUser(id) }
        >
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  );
}

UserDetailsRow.propTypes = {
  name: string,
  email: string,
  role: string,
  id: number,
  removeUser: Function,
}.isRequired;
