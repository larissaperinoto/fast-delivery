import React, { useEffect, useState } from 'react';
import {
  Typography,
  Stack,
  Button,
  Table,
  Container,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import moment from 'moment';
import ProductDetailsCard from '../components/ProductDetailsCard';
import Navbar from '../components/Navbar';
import { methodGet } from '../services/requests';

export default function OrderOrSaleDetails() {
  const [sale, setSale] = useState('');
  const minOrderNumber = 3;
  const route = window.location.pathname;

  useEffect(() => {
    const requestSaleId = async () => {
      const saleId = window.location.pathname.split('/')[3];
      const saleObject = await methodGet(`/sales/${saleId}`);
      setSale(saleObject);
    };
    requestSaleId();
  }, []);

  return (
    <>
      <Navbar />
      { sale
        && <Container maxWidth="md" sx={ { mt: 5 } }>
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
            <Button
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
              { sale.products.map((product) => (<ProductDetailsCard
                key={ product.id }
                id={ product.id }
                price={ product.price }
                name={ product.name }
                quantity={ product.SalesProduct.quantity }
              />))}
            </TableBody>
          </Table>
          <Typography variant="h5" sx={ { mt: 3 } }>
            { `TOTAL R$ ${sale.totalPrice}` }
          </Typography>
        </Container>}
    </>
  );
}
