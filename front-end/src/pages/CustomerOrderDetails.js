import React, { useContext } from 'react';
import CustomerOrdersCard from '../components/CustomerOrdersCard';
import Navbar from '../components/navbar';
import Context from '../context/Context';

export default function CustomerOrderDetails() {
  const { returnPostNewSale } = useContext(Context);
  console.log(returnPostNewSale);
  return (
    <>
      <Navbar />
      {
        returnPostNewSale.map(({ id, totalPrice, deliveryNumber, salesDate, status }) => (
          <CustomerOrdersCard
            key={ id }
            id={ id }
            totalPrice={ totalPrice }
            deliveryNumber={ deliveryNumber }
            salesDate={ salesDate }
            status={ status }
          />
        ))
      }
    </>
  );
}
