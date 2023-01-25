import React, { useEffect, useState } from 'react';
import { requestProducts } from '../services/requests';
import Navbar from '../components/navbar';
import ProductsCard from '../components/productsCard';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRequest = async () => {
      const productsList = await requestProducts();
      console.log('oi', productsList);
      setProducts(productsList);
    };
    productsRequest();
  }, []);

  console.log(products);
  return (
    <div>
      <Navbar />
      <section>
        {products.map(({ id, image, name, price }) => (
          <ProductsCard
            key={ id }
            id={ id }
            imageUrl={ image }
            name={ name }
            price={ price }
          />
        ))}
      </section>
    </div>
  );
}

export default Products;
