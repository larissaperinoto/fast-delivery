import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';

export default function TableHeadOrderDetails() {
  const path = window.location.pathname;
  return (
    <TableHead>
      <TableRow>
        <TableCell>Items</TableCell>
        <TableCell>Descrição</TableCell>
        <TableCell>Quantidade</TableCell>
        <TableCell>Valor unitário</TableCell>
        <TableCell>Sub-total</TableCell>
        { path.includes('checkout') && <TableCell>Remover item</TableCell>}
      </TableRow>
    </TableHead>
  );
}
