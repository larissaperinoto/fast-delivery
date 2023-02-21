import React from 'react';
import { number, string } from 'prop-types';
import { TableRow, TableCell } from '@mui/material';

export default function ProductDetailsRow({ id, price, name, quantity }) {
  return (
    <TableRow key={ id }>
      <TableCell>{ id }</TableCell>
      <TableCell>{ name }</TableCell>
      <TableCell>
        { quantity }
      </TableCell>
      <TableCell>
        { `R$ ${price.replace('.', ',')}` }
      </TableCell>
      <TableCell>
        { `R$ ${(quantity * price).toFixed(2).replace('.', ',')}` }
      </TableCell>
    </TableRow>
  );
}

ProductDetailsRow.propTypes = {
  id: number,
  saleProduct: string,
  price: number,
  name: string,
  quantity: number,
}.isRequired;
