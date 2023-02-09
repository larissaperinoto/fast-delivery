import { TableCell, TableRow, Button } from '@mui/material';
import PropTypes from 'prop-types';
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
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
}.isRequired;
