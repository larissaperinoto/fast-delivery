import React from 'react';
import {
  Typography,
  Stack,
  Button,
  Table,
  Container,
  TableBody,
} from '@mui/material';
import moment from 'moment';
import { TableHeadDetails, ProductDetailsCard } from '.';

export default function OrderOrSaleComponet() {
  const minOrderNumber = 3;
  const route = window.location.pathname;

  return (
    <Container maxWidth="md" sx={ { mt: 5 } }>
      <Stack
        direction="row"
        spacing={ 4 }
        justifyContent="space-between"
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
      <Table sx={ { mt: 3 } }>
        <TableHeadDetails />
        <TableBody>
          { sale.products.map((product) => (<ProductDetailsCard
            key={ product.id }
            id={ product.id }
            price={ product.price }
            name={ product.name }
            quantity={ product.SalesProduct.quantity }
          />))}
        </TableBody>
      </Table>
      <Stack direction="row" sx={ { mt: 3 } } justifyContent="space-between">
        <Typography variant="h6">
          { `TOTAL R$ ${sale.totalPrice.replace('.', ',')}` }
        </Typography>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          size="small"
          disabled
        >
          Marcar como recebido
        </Button>
      </Stack>
    </Container>
  );
}
