import React from 'react';
import { TableHead, TableCell, TableRow } from '@mui/material';

export default function TableHeadAdminManage() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Nome</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Tipo</TableCell>
        <TableCell>Remover</TableCell>
      </TableRow>
    </TableHead>
  );
}
