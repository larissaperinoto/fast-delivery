import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Typography,
  Stack,
  Table,
  Container,
  TableBody,
  Button,
} from '@mui/material';
import { Navbar, TableHeadOrderDetails, ProductDetailsRow } from '../components';
import { methodGet, methodPut } from '../services/requests';

export default function OrderOrSaleDetails() {
  const [sale, setSale] = useState({
    totalPrice: '',
    status: '',
    saleDate: '',
    id: 0,
    sellerInfos: {},
    products: [],
  });

  const minOrderNumber = 3;
  const route = window.location.pathname;
  const sendStatus = 'Em trânsito';

  const requestSaleById = async () => {
    const saleId = window.location.pathname.split('/')[3];
    const saleObject = await methodGet(`/sales/${saleId}`);
    setSale(saleObject);
  };

  const updateToSendedSale = () => {
    methodPut({ status: sendStatus }, `/sales/${sale.id}`);
    requestSaleById();
  };

  const updateToReceivedOrder = () => {
    methodPut({ status: 'Entregue' }, `/sales/${sale.id}`);
    requestSaleById();
  };

  useEffect(() => {
    requestSaleById();
  }, []);

  const buttonByUserRole = () => {
    if (window.location.pathname.includes('customer')) {
      return (
        <Button
          type="button"
          variant="contained"
          color="secondary"
          size="small"
          disabled={ sale.status !== sendStatus }
          onClick={ () => updateToReceivedOrder() }
        >
          Marcar como entregue
        </Button>
      );
    }
    return (
      <Button
        type="button"
        variant="contained"
        color="secondary"
        size="small"
        disabled={ sale.status === sendStatus }
        onClick={ () => updateToSendedSale() }
      >
        Pedido enviado
      </Button>
    );
  };

  return (
    <>
      <Navbar />
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
        <Stack direction="row" spacing={ 2 } sx={ { mt: 3 } } justifyContent="flex-end">
          { buttonByUserRole() }
        </Stack>
      </Container>
    </>
  );
}
