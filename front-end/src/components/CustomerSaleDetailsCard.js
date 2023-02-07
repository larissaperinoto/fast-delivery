import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Stack,
  Button,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

export default function CustomerSaleDetailsCard({
  saleId,
  seller,
  saleDate,
  status,
  products,
  totalPrice,
}) {
  return (
    <Container maxWidth="md" sx={ { mt: 5 } }>
      <Stack
        direction="row"
        spacing={ 4 }
        justifyContent="space-around"
        alignItems="center"
        sx={ { mt: 3 } }
      >
        <Typography
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `00${saleId}`}
        </Typography>
        <Typography
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { `P.Vendedora ${seller}`}
        </Typography>
        <Typography
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { saleDate }
        </Typography>
        <Typography
          data-testid="customer_order_details__element-order-details-label-delivery-status"
        >
          { status }
        </Typography>
        <Button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          variant="contained"
          color="secondary"
          size="small"
          disabled
        >
          Marcar como entregue
        </Button>
      </Stack>
      <Table sx={ { mt: 3 } }>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Valor unitário</TableCell>
            <TableCell>Sub-total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            products.map(({ id, SalesProduct, price, name }) => (
              <TableRow key={ id }>
                <TableCell
                  data-testid={ `customer_order_details_
                      _element-order-table-item-number-${id}` }
                >
                  { id }
                </TableCell>
                <TableCell
                  data-testid={ `customer_order_details_
                      _element-order-table-name-${id}` }
                >
                  { name }
                </TableCell>
                <TableCell
                  data-testid={ `customer_order_details_
                      _element-order-table-quantity-${id}` }
                >
                  { SalesProduct.quantity }
                </TableCell>
                <TableCell
                  data-testid={ `customer_order_details_
                      _element-order-table-unit-price-${id}` }
                >
                  { `R$ ${price.replace('.', ',')}` }
                </TableCell>
                <TableCell
                  data-testid={ `customer_order_details_
                      _element-order-table-sub-total-${id}` }
                >
                  { `R$ ${(SalesProduct.quantity * price).toFixed(2).replace('.', ',')}` }
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Typography
        data-testid="customer_order_details__element-order-total-price"
        variant="h5"
        sx={ { mt: 3 } }
      >
        { `TOTAL R$ ${totalPrice}` }
      </Typography>
    </Container>
  );
}

CustomerSaleDetailsCard.propTypes = {
  saleId: PropTypes.number,
  saleDate: PropTypes.string,
  seller: PropTypes.string,
  status: PropTypes.string,
  products: PropTypes.array,
  totalPrice: PropTypes.number,
}.isRequired;
