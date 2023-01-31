import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { customerOrders } from '../services/requests';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const requestOrdersBySeller = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const ordersList = await customerOrders(token);
      setOrders(ordersList);
    };
    requestOrdersBySeller();
  });
  return (
    <>
      <Navbar />
      <div>
        { orders.length
          ? orders.map((order) => (
            <CustomerOrders
              key={ order.id }
              id={ order.id }
              status={ order.status }
              totalPrice={ order.total_price }
              deliveryAddress={ order.delivery_address }
              deliveryNumber={ order.delivery_number }
              saleDate={ order.sales_date }
            />))
          : <p>Não há pedidos para mostrar.</p> }
      </div>
    </>
  );
}
