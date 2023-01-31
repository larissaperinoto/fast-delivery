import React, { useState } from 'react';
import NavBar from '../components/navbar';
import SellerOrdersCard from '../components/SellerOrdersCard';
import { sellerOrders } from '../services/requests';

export default function SellerOrders() {
  const [salesOrdersSeller, setSalesOrdersSeller] = useState([]);

  useEffect(() => {
    const sales = async () => {
      const { id } = JSON.parse(localStorage.getItem('user'));
      const salesSeller = await sellerOrders(id);
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
          totalPrice={ orders.total_price }
          deliveryAddress={ orders.delivery_address }
          deliveryNumber={ orders.delivery_number }
          saleDate={ orders.sales_date }
        />))}
      </div>
    </div>
  );
}
