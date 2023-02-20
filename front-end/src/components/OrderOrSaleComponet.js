import React from 'react';
import { string, number, array, object, objectOf } from 'prop-types';
import {
  Typography,
  Stack,
  Table,
  Container,
  TableBody,
} from '@mui/material';
import moment from 'moment';
import { TableHeadOrderDetails, ProductDetailsRow } from '.';
import ContainedButton from './ContainedButton';

export default function OrderOrSaleComponet({ sale }) {
  const minOrderNumber = 3;
  const route = window.location.pathname;

  return (
    <Container maxWidth="md" sx={ { mt: 5 } }>
      <Stack
        direction="row"
        spacing={ 4 }
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
        sx={ { mt: 3 } }
      >
        <Typography>
          { `PEDIDO ${sale.id.toString().padStart(minOrderNumber, 0)}` }
        </Typography>
        { route.includes('customer')
              && <Typography>{ `P.Vendedora ${sale.sellerInfos.name}`}</Typography>}
        <Typography>{ moment(sale.saleDate).format('DD/MM/YYYY')}</Typography>
        <Typography>{ sale.status }</Typography>
      </Stack>
      <Stack sx={ { mt: 3, overflowX: 'auto', maxWidth: '100%' } }>
        <Table>
          <TableHeadOrderDetails />
          <TableBody>
            { sale.products.map((product) => (<ProductDetailsRow
              key={ product.id }
              id={ product.id }
              price={ product.price }
              name={ product.name }
              quantity={ product.SalesProduct.quantity }
            />))}
          </TableBody>
        </Table>
      </Stack>
      <Typography variant="h6" sx={ { mt: 3 } }>
        { `TOTAL R$ ${sale.totalPrice.replace('.', ',')}` }
      </Typography>
      <Stack direction="row" sx={ { mt: 3 } } justifyContent="flex-end">
        <ContainedButton text="Marcar como entregue" disabled="true" />
      </Stack>
    </Container>
  );
}

OrderOrSaleComponet.propTypes = {
  sale: objectOf({
    totalPrice: number,
    status: string,
    saleDate: string,
    id: number,
    sellerInfos: object,
    products: array,
  }),
}.isRequired;
