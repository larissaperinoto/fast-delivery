import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { methodGet } from '../services/requests';

import OrderOrSaleComponet from '../components/OrderOrSaleComponet';

export default function OrderOrSaleDetails() {
  const [sale, setSale] = useState('');

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
        ? <OrderOrSaleComponet sale={ sale } />
        : <Typography>Carregando...</Typography>}
    </>
  );
}
