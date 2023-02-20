import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import OrderOrSaleCard from '../components/OrderOrSaleCard';
import Navbar from '../components/Navbar';
import { methodGet } from '../services/requests';

export default function OrdersOrSales() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const requestList = async () => {
      const { id } = JSON.parse(localStorage.getItem('user'));
      let requestedList = '';
      if (window.location.pathname.includes('seller')) {
        requestedList = await methodGet(`/sales/seller/${id}`);
      } else {
        requestedList = await methodGet(`/sales/customer/${id}`);
      }
      setList(requestedList);
    };
    requestList();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={ { mt: 5 } }>
        { list && list.map((item, index) => (
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
