import React, { useEffect, useState } from 'react';
import requestProducts from '../services/requests';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRequest = async () => {
      const productsList = await requestProducts();
      setProducts(productsList);
    };
    productsRequest();
  }, []);

  console.log(products);

  return (
    <div>
      <nav>
        <div data-testid="customer_products__element-navbar-link-products" />
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div data-testid="customer_products__element-navbar-link-logout" />
      </nav>
    </div>
  );
}
