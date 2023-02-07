import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import SellerOrdersCard from '../components/SellerOrdersCard';
import { sellerOrders } from '../services/requests';

export default function SellerOrders() {
  const [salesOrdersSeller, setSalesOrdersSeller] = useState([]);

  useEffect(() => {
    const sales = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const salesSeller = await sellerOrders(token);
      console.log(salesSeller);
      setSalesOrdersSeller(salesSeller);
    };
    sales();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        { salesOrdersSeller.map((orders) => (<SellerOrdersCard
          key={ orders.id }
          id={ orders.id }
          status={ orders.status }
          totalPrice={ orders.totalPrice }
          deliveryAddress={ orders.deliveryAddress }
          deliveryNumber={ orders.deliveryNumber }
          saleDate={ orders.salesDate }
        />))}
      </div>
    </div>
  );
}