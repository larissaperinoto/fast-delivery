import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';

export default function ProductDetailsCard({ id, price, name, quantity }) {
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

ProductDetailsCard.propTypes = {
  id: PropTypes.number,
  saleProduct: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
}.isRequired;
