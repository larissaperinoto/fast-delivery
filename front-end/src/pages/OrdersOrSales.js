import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import OrderOrSaleCard from '../components/OrderOrSaleCard';
import Navbar from '../components/Navbar';
import { methodGet } from '../services/requests';

export default function OrdersOrSales() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const requestList = async () => {
      const requestedList = await methodGet('/sales/user');
      setList(requestedList);
    };
    requestList();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={ { mt: 5 } }>
        { list.length && list.map((item, index) => (
          <OrderOrSaleCard
            key={ index }
            id={ item.id }
            status={ item.status }
            totalPrice={ item.totalPrice.replace('.', ',') }
            saleDate={ item.saleDate }
            index={ index }
            deliveryAddress={ item.deliveryAddress }
            deliveryNumber={ item.deliveryNumber }
          />))}
      </Container>
    </>
  );
}
