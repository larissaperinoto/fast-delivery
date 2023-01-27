import React, { useState } from 'react';
import NavBar from '../components/navbar';
import SellerOrdersCard from '../components/SellerOrdersCard';
import { sellerProducts } from '../services/requests';

export default function SellerOrders() {
  const [salesOrdersSeller, setSalesOrdersSeller] = useState([]);

  useEffect(() => {
    const sales = async () => {
      const salesSeller = await sellerProducts();
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
