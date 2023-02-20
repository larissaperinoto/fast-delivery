import { TableCell, TableRow, Button } from '@mui/material';
import { string } from 'prop-types';
import React from 'react';

export default function UserDetailsCard({ name, email, role }) {
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

UserDetailsCard.propTypes = {
  name: string,
  email: string,
  role: string,
}.isRequired;
