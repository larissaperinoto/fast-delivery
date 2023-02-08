import React, { useEffect, useState } from 'react';
import CustomerSaleDetailsCard from '../components/CustomerSaleDetailsCard';
import Navbar from '../components/Navbar';
import { methodGet } from '../services/requests';

export default function CustomerOrderDetails() {
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
      { sale && <CustomerSaleDetailsCard
        saleId={ sale.id }
        seller={ sale.sellerInfos.name }
        saleDate={ sale.saleDate }
        status={ sale.status }
        products={ sale.sales_products }
        totalPrice={ sale.totalPrice.replace('.', ',') }
      />}
    </>
  );
}
