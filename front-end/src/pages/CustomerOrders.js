import React, { useEffect, useState } from 'react';
import CustomerOrdersCard from '../components/CustomerOrdersCard';
import Navbar from '../components/navbar';
import { customerOrders } from '../services/requests';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const formatDate = (date) => {
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2].split('T')[0];
    return `${day}/${month}/${year}`;
  };

  const formatOrder = (ordersList) => ordersList.map((order) => {
    const newFormat = { ...order, saleDate: formatDate(order.saleDate) };
    return newFormat;
  });

  useEffect(() => {
    const requestOrders = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const ordersList = await customerOrders(token);
      const ordersListFormated = formatOrder(ordersList);
      setOrders(ordersListFormated);
    };
    requestOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        { orders.map((order, index) => (
          <CustomerOrdersCard
            key={ index }
            id={ order.id }
            status={ order.status }
            totalPrice={ order.totalPrice.replace('.', ',') }
            saleDate={ order.saleDate }
            index={ index }
          />))}
      </div>
    </>
  );
}
