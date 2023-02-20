import { TableCell, TableRow, Button } from '@mui/material';
import { string } from 'prop-types';
import React from 'react';

export default function UserDetailsRow({ name, email, role }) {
  return (
    <TableRow>
      <TableCell>{ name }</TableCell>
      <TableCell>{ email }</TableCell>
      <TableCell>{ role }</TableCell>
      <TableCell>
        <Button>
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
}.isRequired;
